<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Nature;
use Illuminate\Http\Request;

class NatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $quey = Nature::query();
        if ($request->has("code")) {
            $quey->whereIn('code', explode(";", $request->get("code")));
        }
        return [
            "data" => $quey->orderBy('nom', 'asc')
                ->get()
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
    public function show(Nature $nature)
    {
        return response()->json($nature);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nature $nature)
    {
        //
    }
}
