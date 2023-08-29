<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\TypeOrganisationService;
use App\Models\TypeOrganisation;
use Illuminate\Http\Request;

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
    public function index()
    {
        return [
            'data' => TypeOrganisation::query()
                ->orderBy('nom', 'asc')
                ->get()
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->typeOrganisationService->create($request->all());
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
        $this->typeOrganisationService->update($typeOrganisation, $request->except(['code']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypeOrganisation $typeOrganisation)
    {
        //
    }
}
