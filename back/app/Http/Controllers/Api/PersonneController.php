<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributionResource;
use App\Http\Resources\PersonneResource;
use App\Http\Services\AttributionService;
use App\Http\Services\PersonneService;
use App\ModelFilters\PersonneFilter;
use App\Models\Attribution;
use App\Models\Personne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonneController extends Controller
{
    private PersonneService $personneService;
    private AttributionService $attributionService;

    private $attributionActive;

    public function __construct(PersonneService $personneService, AttributionService $attributionService)
    {
        $this->personneService = $personneService;
        $this->attributionService = $attributionService;

        $this->attributionActive = function ($query) {
            $query->where('date_debut', '<=', now())
                ->where(function ($subQuery) {
                    $subQuery->whereNull('date_fin')
                        ->orWhere('date_fin', '>=', now());
                });
        };
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = $this->buildQuery($request);

        $result = $this->addPaging($request, $query);

        $data = $result['query']
            ->select('personnes.*')
            ->orderBy('nom', 'asc')
            ->with([
                'genre',
                'attributions.fonction',
                'attributions.organisation.nature',
                'attributions'  => $this->attributionActive
            ])
            ->get();

        return [
            'data' => PersonneResource::collection($data),
            'meta' => $result['meta'],
        ];
    }

    private function buildQuery(Request $request)
    {
        $query = Personne::filter($request->all(), PersonneFilter::class);

        if ($request->has('fonctionId') || $request->has('organisationId')) {
            $fonctionId = $request->input('fonctionId', null);
            $organisationId = $request->input('organisationId', null);
            $query->join('attributions as a', function ($builder) {
                $builder->on('a.personne_id', 'personnes.id');
            });
            if (isset($fonctionId)) {
                $query->where('a.fonction_id', $fonctionId);
            }
            if (isset($organisationId)) {
                $inclureSousOrganisation = $request->input('inclureSousOrganisation', null);
                if ($inclureSousOrganisation === 'true') {
                    $query->join('organisations as o', function ($q) {
                        $q->on('o.id', 'a.organisation_id');
                    });
                    $query->where(function ($q) use ($organisationId) {
                        $q->where(DB::raw("JSON_CONTAINS(JSON_EXTRACT(o.parents, '$[*].id') , '\"" . $organisationId . "\"')"), '=', 1)
                            ->orWhere('o.id', $organisationId);
                    });
                } else {
                    $query->where('a.organisation_id', $organisationId);
                }
            }

            $query->where('a.date_debut', '<=', now())
                ->where(function ($q) {
                    $q->whereNull('a.date_fin')
                        ->orWhere('a.date_fin', '>=', now());
                });
        }
        return $query;
    }

    public function exportPersonnes(Request $request)
    {

        $query = $this->buildQuery($request);

        $fields = collect(explode(";", $request->get('fields', "")));

        $personnes = $query
            ->select('personnes.*')
            ->orderBy('nom', 'asc')
            ->with([
                'genre',
                'attributions.fonction',
                'attributions.organisation',
                'attributions' => $this->attributionActive
            ])
            ->get()
            ->map(function ($personne) {
                $attribution = $personne->attributions[0] ?? null;
                $organisation = $attribution != null ? $attribution->organisation : null;
                $nature = $organisation != null ? $organisation->nature : null;
                $fonction = $attribution != null ? $attribution->fonction : null;
                return [
                    "p_code" => $personne->code,
                    "p_nom" => $personne->nom,
                    "p_prenom" => $personne->prenom,
                    "p_genre" => $personne->genre->nom,
                    "p_date_naissance" => $personne->date_naissance,
                    "p_lieu_naissance" => $personne->lieu_naissance,
                    "f_code" => $fonction->code ?? "",
                    "f_nom" => $fonction->nom ?? "",
                    "o_code" => $organisation->code ?? "",
                    "o_nom" => $organisation->nom ?? "",
                    "o_nature" => $nature->nom ?? "",
                ];
            });

        $fileName = 'personnes.csv';

        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );

        $MAPPER = collect([
            "p_code" => "Code",
            "p_nom" => "Nom",
            "p_prenom" => "Prénom",
            "p_genre" => "Genre",
            "p_date_naissance" => "Date naissance",
            "p_lieu_naissance" => "Lieu naissance",
            "f_code" => "Code fonction",
            "f_nom" => "Nom fonction",
            "o_code" => "Code organisation",
            "o_nom" => "Nom organisation",
            "o_nature" => "Nature organisation"
        ]);

        $callback = function () use ($personnes, $fields, $MAPPER) {

            $file = fopen('php://output', 'w');
            $headers = $MAPPER
                ->filter(function ($item, $key) use ($fields) {
                    return $fields->contains($key);
                })
                ->values()
                ->toArray();

            fputcsv($file, $headers, ";");

            $personnes->each(function ($personne) use ($file, $MAPPER, $fields) {
                $line = collect($personne)
                    ->filter(function ($item, $key) use ($fields) {
                        return $fields->contains($key);
                    })
                    ->only($MAPPER->keys())
                    ->values()
                    ->toArray();
                fputcsv($file, $line, ";");
            });
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function readAttribiutions(Request $request)
    {
        return [
            'data' => AttributionResource::collection(
                Attribution::where('personne_id', $request->route('personneId'))
                    ->with(['organisation.nature', 'fonction'])
                    ->get()
            )
        ];
    }

    public function readPersonnesSansFonction(Request $request)
    {
        return [
            'data' => $this->personneService->readPersonnesSansFonction($request->all())
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $personne = $this->personneService->create($request->all());
        return new PersonneResource($personne);
    }

    /**
     * Display the specified resource.
     */
    public function show(Personne $personne)
    {
        $personne->load(['ville', 'niveauFormation', 'genre']);
        return new PersonneResource($personne);
    }

    public function affecter(Request $request)
    {
        $attribution = $this->personneService->affecter($request->route('personneId'), $request->all());

        $attribution->load(['personne', 'organisation', 'fonction']);

        return new AttributionResource($attribution);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Personne $personne)
    {
        $personne = $this->personneService->update($personne, $request->all());
        return $personne;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Personne $personne)
    {
        //
    }
}
