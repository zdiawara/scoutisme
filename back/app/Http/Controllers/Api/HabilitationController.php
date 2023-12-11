<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HabilitationResource;
use App\Models\Habilitation;
use Illuminate\Http\Request;

class HabilitationController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Habilitation::query();

        if ($request->has('roleId')) {
            $query = $query->where('role_id', $request->get('roleId'));
        }

        return [
            'data' => HabilitationResource::collection($query->with('fonctionnalite')->get())
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Habilitation::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Habilitation $habilitation)
    {
        $habilitation->load('fonctionnalites');

        return new HabilitationResource($habilitation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Habilitation $habilitation)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Habilitation $habilitation)
    {
        $habilitation->delete();
    }
}
