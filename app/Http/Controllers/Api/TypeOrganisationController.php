<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\TypeOrganisationService;
use App\Models\TypeOrganisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TypeOrganisationController extends Controller
{
    private $typeOrganisationService;

    public function __construct(TypeOrganisationService $typeOrganisationService)
    {
        $this->typeOrganisationService = $typeOrganisationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TypeOrganisation::query();

        if ($request->has("nature_id")) {
            $query->where('nature_id', $request->get('nature_id'));
        }

        if ($request->has("nature_code")) {
            $query->join('natures as n', function ($builder) {
                $builder->on('n.id', 'types_organisations.nature_id');
            });
            $query->where('n.code', $request->get('nature_code'));
        }


        return [
            'data' => $query->select('types_organisations.*')->orderBy('position', 'asc')
                ->get()
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $typeOrganisation = $this->typeOrganisationService->create($request->all());

        Log::info('Type d\'organisation créé via API', [
            'type_organisation_id' => $typeOrganisation->id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TypeOrganisation $typeOrganisation)
    {
        return response()->json($typeOrganisation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypeOrganisation $typeOrganisation)
    {
        $typeOrganisation = $this->typeOrganisationService->update($typeOrganisation, $request->except(['code']));

        Log::info('Type d\'organisation mis à jour via API', [
            'type_organisation_id' => $typeOrganisation->id,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypeOrganisation $typeOrganisation)
    {
        $typeOrganisationId = $typeOrganisation->id;
        $typeOrganisation->delete();

        Log::info('Type d\'organisation supprimé via API', [
            'type_organisation_id' => $typeOrganisationId,
        ]);
    }
}
