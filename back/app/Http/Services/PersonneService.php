<?php

namespace App\Http\Services;

use App\Http\Resources\PersonneCollection;
use App\ModelFilters\PersonneFilter;
use App\Models\Organisation;
use App\Models\Personne;
use Illuminate\Support\Facades\DB;
use sirajcse\UniqueIdGenerator\UniqueIdGenerator;

class PersonneService
{

    private AttributionService $attributinService;
    private array $config;

    public function __construct(AttributionService $attributinService)
    {
        $this->attributinService = $attributinService;
        $prefix = date("ym");
        $this->config = [
            'table' => 'personnes', 'field' => 'code', 'length' => 8,  'prefix' => $prefix . '-', 'reset_on_change' => 'prefix'
        ];
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
}
