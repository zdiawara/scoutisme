<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributionResource;
use App\Http\Resources\PersonneResource;
use App\Http\Services\PersonneService;
use App\ModelFilters\PersonneFilter;
use App\Models\Attribution;
use App\Models\Personne;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonneController extends Controller
{
    private PersonneService $personneService;

    public function __construct(PersonneService $personneService)
    {
        $this->personneService = $personneService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Personne::filter($request->all(), PersonneFilter::class);

        if ($request->has('fonctionId') || $request->has('organisationId')) {
            $fonctionId = $request->input('fonctionId', null);
            $organisationId = $request->input('organisationId', null);
            $query->whereHas('attributions', function (Builder $q) use ($fonctionId, $organisationId) {
                if (isset($fonctionId)) {
                    $q->where('fonction_id', $fonctionId);
                }
                if (isset($organisationId)) {
                    $q->where('organisation_id', $organisationId);
                }
            });
        }

        $total = $query->count();
        $data = collect([]);

        if ($total > 0) {
            $page = $request->get('page', 1);
            $size = $request->get('size', 100);
            $data = $query
                ->offset(($page - 1) * $size)
                ->limit($size)
                ->orderBy('nom', 'asc')
                ->with([
                    'genre',
                    'attributions.fonction',
                    'attributions.organisation',
                    'attributions'  => function ($q) {
                        $q->where('date_debut', '<=', now())
                            ->where(function ($subQuery) {
                                $subQuery->whereNull('date_fin')
                                    ->orWhere('date_fin', '>=', now());
                            });
                    }
                ])
                ->get();
        }

        return [
            'data' => PersonneResource::collection($data),
            'total' => $total,
        ];


        return $this->personneService->readPersonnes($request->all());
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $personne = $this->personneService->create($request->all());
        return new PersonneResource($personne);
    }

    public function createScout(Request $request)
    {
        $personne = $this->personneService->createScout($request->all());
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
