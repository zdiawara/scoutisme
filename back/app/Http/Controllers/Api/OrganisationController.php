<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrganisationResource;
use App\Http\Services\OrganisationService;
use App\ModelFilters\OrganisationFilter;
use App\Models\Organisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrganisationController extends Controller
{
    private $organisationService;

    public function __construct(OrganisationService $organisationService)
    {
        $this->organisationService = $organisationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Organisation::filter($request->all(), OrganisationFilter::class);

        if ($request->has('organisationId')) {
            $organisationId = $request->get('organisationId');
            if ($request->has('perimetres')) {
                $query->join('natures as enfant_nature', function ($q) {
                    $q->on('enfant_nature.id', 'organisations.nature_id');
                });
                $perimetres = explode(";", $request->get('perimetres', ""));
                // Tenir compte d'une organisation et ses sous organisations
                $query->where(function ($q) use ($organisationId, $perimetres) {
                    $q->where(function ($qb) use ($organisationId, $perimetres) {
                        $qb->where(DB::raw("JSON_CONTAINS(JSON_EXTRACT(organisations.parents, '$[*].id') , '\"" . $organisationId . "\"')"), '=', 1)
                            ->whereIn('enfant_nature.code', $perimetres);
                    })->orWhere('organisations.id', $organisationId);
                });
            } else {
                $query->where('id', $organisationId);
            }
        }

        $data = collect([]);

        $result = $this->addPaging($request, $query);


        $data = $result['query']
            ->select('organisations.*')
            ->orderBy('nom', 'asc')
            ->with(['nature', 'type', 'parent'])
            ->get();

        return [
            'data' => OrganisationResource::collection($data),
            'meta' => $result['meta'],
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $organisation = $this->organisationService->create($request->all());
        return new OrganisationResource($organisation);
    }

    /**
     * Display the specified resource.
     */
    public function show(Organisation $organisation)
    {
        $organisation->load(['nature', 'type', 'parent', 'ville']);
        // $organisation['parents'] = collect(DB::select(
        //     'WITH RECURSIVE cte AS (
        //             SELECT
        //                 uo.id,
        //                 uo.nom,
        //                 JSON_ARRAY(
        //                     JSON_OBJECT("id", CAST(uo.id AS CHAR(200)), "nom", uo.nom, "nature", JSON_OBJECT("id", n.id, "nom", n.nom))
        //                 ) AS parents
        //             FROM organisations uo
        //                 INNER JOIN natures n ON n.id = uo.nature_id
        //             WHERE
        //                 parent_id is null
        //             UNION ALL
        //             SELECT
        //                 c.id,
        //                 c.nom,
        //                 JSON_MERGE_PRESERVE(
        //                     cte.parents,
        //                     JSON_ARRAY(
        //                         JSON_OBJECT("id", CAST(c.id AS CHAR(200)), "nom", c.nom, "nature", JSON_OBJECT("id", n.id, "nom", n.nom))
        //                     )
        //                 ) as parents
        //             FROM organisations c
        //                 INNER JOIN natures n ON n.id = c.nature_id
        //                 JOIN cte ON cte.id = c.parent_id
        //         )
        //         SELECT parents FROM cte WHERE cte.id = :id;
        //     ',
        //     ['id' => $organisation->id]
        // ))->map(function ($item) {
        //     return json_decode($item->parents);
        // })->first();

        return new OrganisationResource($organisation);
    }

    public function readDirection(Request $request)
    {
        return [
            'data' => $this->organisationService->readDirection($request->route('organisationId'), $request->all())
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Organisation $organisation)
    {
        $organisation = $this->organisationService->update($organisation, $request->all());
        return $organisation;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organisation $organisation)
    {
        //
    }
}
