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
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

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

        $total = $query->count();
        $data = collect([]);

        if ($total > 0) {
            $page = $request->get('page', 1);
            $size = $request->get('size', 100);
            $data = $query
                ->select('personnes.*')
                ->offset(($page - 1) * $size)
                ->limit($size)
                ->orderBy('nom', 'asc')
                ->with([
                    'genre',
                    'attributions.fonction',
                    'attributions.organisation',
                    'attributions'  => $this->attributionActive
                ])
                ->get();
        }

        return [
            'data' => PersonneResource::collection($data),
            'total' => $total,
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
                $query->where('a.organisation_id', $organisationId);
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

        $data = $query
            ->orderBy('nom', 'asc')
            ->with([
                'genre',
                'attributions.fonction',
                'attributions.organisation',
                'attributions'  => $this->attributionActive
            ])
            ->get();

        $fileName = 'personnes.csv';

        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );

        $columns = array('Nom', 'Prénom', 'Organisation', 'Fonction', 'Lieu naissance', 'Date naissance', 'Email');

        $callback = function () use ($data, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns, ";");
            foreach ($data as $personne) {
                fputcsv(
                    $file,
                    array($personne->nom, $personne->prenom, '', '', $personne->lieu_naissance, $personne->date_naissance, $personne->email),
                    ";"
                );
            }
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
