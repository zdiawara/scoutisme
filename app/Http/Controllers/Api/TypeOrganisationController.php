<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TypeOrganisation;
use Illuminate\Http\Request;

class TypeOrganisationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(TypeOrganisation::all());
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
    public function show(TypeOrganisation $typeOrganisation)
    {
        return response()->json($typeOrganisation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypeOrganisation $typeOrganisation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypeOrganisation $typeOrganisation)
    {
        //
    }
}
