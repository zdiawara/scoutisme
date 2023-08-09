<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Scout;
use Illuminate\Http\Request;

class ScoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Scout::all());
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
    public function show(Scout $scout)
    {
        return response()->json($scout);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Scout $scout)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Scout $personne)
    {
        //
    }
}
