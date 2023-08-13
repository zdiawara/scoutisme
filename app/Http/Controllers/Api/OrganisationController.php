<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrganisationResource;
use App\Http\Services\OrganisationService;
use App\ModelFilters\OrganisationFilter;
use App\Models\Organisation;
use Illuminate\Http\Request;

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

        $total = $query->count();
        $data = null;

        if ($total > 0) {
            $page = $request->get('page', 1);
            $size = $request->get('size', 10);
            $data = $query
                ->offset(($page - 1) * $size)
                ->limit($size)
                ->orderBy('nom', 'asc')
                ->with(['nature', 'type', 'parent'])
                ->get();
        }

        return [
            'data' => OrganisationResource::collection($data),
            'total' => $total,
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Organisation $organisation)
    {
        return response()->json($organisation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Organisation $organisation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organisation $organisation)
    {
        //
    }
}
