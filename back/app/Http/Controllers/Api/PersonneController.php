<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributionResource;
use App\Http\Resources\PersonneResource;
use App\Http\Resources\UserResource;
use App\Http\Services\PersonneService;
use App\Http\Services\UserService;
use App\ModelFilters\PersonneFilter;
use App\Models\Attribution;
use App\Models\Personne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonneController extends Controller
{
    private PersonneService $personneService;
    private $userService;

    public function __construct(
        PersonneService $personneService,
        UserService $userService
    ) {
        $this->personneService = $personneService;
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = $this->buildSearchQuery($request);

        $result = $this->addPaging($request, $query);

        $data = $result['query']
            ->select('personnes.*')
            ->orderBy('nom', 'asc')
            ->with([
                'genre',
                'fonction',
                'organisation.nature',
            ])
            ->get();

        return [
            'data' => PersonneResource::collection($data),
            'meta' => $result['meta'],
        ];
    }

    private function buildSearchQuery(Request $request)
    {
        $query = Personne::filter($request->all(), PersonneFilter::class);

        if ($request->has('organisationId')) {
            $organisationId = $request->input('organisationId');
            $inclureSousOrganisation = $request->input('inclureSousOrganisation', null);
            if ($inclureSousOrganisation === 'true') {
                $query->join('organisations as o', function ($q) {
                    $q->on('o.id', 'personnes.organisation_id');
                });
                // Tenir compte d'une organisation et ses sous organisations
                $query->where(function ($q) use ($organisationId) {
                    $q->where(DB::raw("JSON_CONTAINS(JSON_EXTRACT(o.parents, '$[*].id') , '\"" . $organisationId . "\"')"), '=', 1)
                        ->orWhere('o.id', $organisationId);
                });
            } else {
                $query->where('personnes.organisation_id', $organisationId);
            }

            $query->where('personnes.date_debut', '<=', now())
                ->where(function ($q) {
                    $q->whereNull('personnes.date_fin')
                        ->orWhere('personnes.date_fin', '>=', now());
                });
        }
        return $query;
    }

    public function exportPersonnes(Request $request)
    {

        $query = $this->buildSearchQuery($request);

        $fields = collect(explode(";", $request->get('fields', "")));

        $personnes = $query
            ->select('personnes.*')
            ->orderBy('nom', 'asc')
            ->with(['genre', 'fonction', 'organisation',])
            ->get()
            ->map(function ($personne) {
                $organisation = $personne->organisation;
                $nature = $organisation != null ? $organisation->nature : null;
                $fonction = $personne->fonction;
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

    public function readAttributions(Request $request)
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
        $personne->load(['ville', 'niveauFormation', 'genre', 'fonction', 'organisation.nature']);
        return new PersonneResource($personne);
    }

    public function createAttribution(Personne $personne, Request $request)
    {
        $personne = $this->personneService->affecter($personne, $request->all());
        $personne->load(['ville', 'niveauFormation', 'genre', 'fonction', 'organisation']);

        return new PersonneResource($personne);
    }

    public function convertir(Personne $personne, Request $request)
    {
        $user = $this->userService->createFromPersonne($personne, $request->all());

        return new UserResource($user);
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

    public function deleteAttribution(Personne $personne)
    {
        $personne->update([
            'fonction_id' => null,
            'organisation_id' => null,
            'date_debut' => null,
            'date_fin' => null
        ]);
    }

    public function cloturerAttribution(Personne $personne, Request $request)
    {
        $personne->update($request->only([
            'date_fin'
        ]));
    }
}
