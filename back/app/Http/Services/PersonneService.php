<?php

namespace App\Http\Services;

use App\Helpers\Nature;
use App\Http\Resources\PersonneCollection;
use App\ModelFilters\PersonneFilter;
use App\Models\Organisation;
use App\Models\Personne;
use Illuminate\Support\Facades\DB;
use sirajcse\UniqueIdGenerator\UniqueIdGenerator;

class PersonneService
{

    private AttributionService $attributinService;
    private CotisationService $cotisationService;

    public function __construct(AttributionService $attributinService, CotisationService $cotisationService)
    {
        $this->attributinService = $attributinService;
        $this->cotisationService = $cotisationService;
    }

    public function readPersonnes(array $filters): PersonneCollection
    {
        $data = Personne::filter($filters, PersonneFilter::class)
            ->paginate(10);
        return new PersonneCollection($data);
    }

    public function create(array $input): Personne
    {

        $body = collect($input);

        DB::beginTransaction();

        $attribution = [];

        $code = $this->computeCode($body['attribution'] ?? null);

        $personne = Personne::create($body->except("attribution")
            ->merge(['code' => $code])
            ->all());

        if ($body->has('attribution')) {
            $attribution = collect($body->get('attribution'));
            $attributionInput = [
                'organisation_id' => $attribution->get("organisation_id"),
                'fonction_id' => $attribution->get('fonction_id'),
                'personne_id' => $personne->id,
                'date_debut' => $attribution->get('date_debut'),
                'date_fin' => $attribution->get('date_fin'),
            ];
            $this->attributinService->create($attributionInput);
        }

        DB::commit();

        return $personne;
    }

    private function computeCode($attribution)
    {
        $prefix = "";
        if ($attribution == null) {
            $prefix = "PERS";
        } else {
            $organisation = Organisation::findOrFail($attribution['organisation_id']);
            $code = collect([$organisation->code]);
            $prefix = $code
                ->map(fn ($item) => strtoupper($item))
                ->reverse()
                ->join("-");
        }

        $prefix = $prefix . '-';
        return UniqueIdGenerator::generate([
            'table' => 'personnes',
            'field' => 'code',
            'length' => strlen($prefix) + 4, // 4 est la longueur du format numérique
            'prefix' => $prefix,
            'reset_on_change' => "prefix"
        ]);
    }

    public function update(Personne $personne, array $body)
    {
        $personne->update($body);
        return $personne;
    }

    public function readPersonnesSansFonction($params)
    {
        return DB::select(
            'SELECT p.nom, p.prenom, p.id FROM personnes p WHERE p.type = :type and 
                (p.date_debut is null or (p.fonction_id is not null and p.date_fin is not null and p.date_fin < now()))',
            ['type' => $params['type'] ?? null]
        );
    }

    public function affecter(Personne $personne, array $body): Personne
    {
        $personne->update(collect($body)->only([
            'fonction_id', 'organisation_id', 'date_debut', 'date_fin'
        ])->toArray());

        return $personne;
    }

    public function carteMembre(Personne $personne, array $body)
    {
        $cotisation = $this->cotisationService->find($personne->id, collect($body)->get('annee', date('Y')));

        if ($cotisation && $cotisation->montant_restant !== 0) {
            return [
                'message' => "La carte d'adhésion n'est pas disponible. La personne n'est pas à jour dans ses cotisations",
                'date' => [],
            ];
        }

        $organisation = $personne->organisation;


        if ($organisation == null) {
            return [
                'message' => "Impossible de générer une carte pour une personne qui n'est pas rattachée à une d'organisation",
                'date' => [],
            ];
        }

        $data = [
            'meta' => [
                'association' => 'ASSOCIATION DES SCOUTS DU BURKINA FASO',
                'signataire' => [
                    'libelle' => 'Le président du comité national',
                    'nom' => ''
                ]
            ],
            'personne' => [
                'nom' => $personne->prenom . ' ' . $personne->nom,
                'code' => $personne->code,
                'fonction' => $personne->fonction != null ?  $personne->fonction->nom : ''
            ],
            'validite' => [
                'debut' => date('d/m/Y', strtotime($personne->date_debut)),
                'fin' => $personne->date_fin ? date('d/m/Y', strtotime($personne->date_fin)) : ''
            ]
        ];

        $lignes = collect([
            ["nom" => "ID", "value" => $personne->code]
        ]);


        $nature = $organisation->nature->code;

        if ($nature == Nature::NATIONAL) {
            $lignes->push(
                ["nom" => "Organisation", "value" => $organisation->nom]
            );
        } else {

            $hasRegionLevel = collect([Nature::UNITE, Nature::GROUPE])->contains($nature);

            if ($hasRegionLevel) {
                $parents = collect($organisation ? $organisation->parents : []);
                $region = $parents->first(fn ($item) => $item['nature'] === Nature::REGION);
                $lignes->push(
                    ["nom" => "Region", "value" => $region ? $region['nom'] : '']
                );
            }

            if ($nature == Nature::UNITE) {
                $lignes->push(["nom" => "Unite", "value" =>  $organisation->nom]);
            } else if ($nature == Nature::GROUPE) {
                $lignes->push(["nom" => "Groupe", "value" =>  $organisation->nom]);
            } else if ($nature == Nature::REGION) {
                $lignes->push(["nom" => "Region", "value" =>  $organisation->nom]);
            }

            if ($personne->type == "scout") {
                $lignes->push(["nom" => "Branche", "value" => $organisation->type->membre]);
            }
        }

        $data['lignes'] = $lignes;

        return [
            "data" => $data
        ];
    }
}
