<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributionResource;
use App\Http\Services\AttributionService;
use App\ModelFilters\AttributionFilter;
use App\Models\Attribution;
use Illuminate\Http\Request;

class AttributionController extends Controller
{

    private $attributionService;

    public function __construct(AttributionService $attributionService)
    {
        $this->attributionService = $attributionService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Attribution::filter($request->all(), AttributionFilter::class)
            ->with(['personne', 'organisation.nature', 'fonction']);

        return [
            "data" => AttributionResource::collection($query->get())
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attribution = $this->attributionService->create($request->all());
        $attribution->load(['personne', 'organisation.nature', 'fonction']);
        return new AttributionResource($attribution);
    }

    /**
     * Display the specified resource.
     */
    public function show(Attribution $attribution)
    {
        return response()->json($attribution);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attribution $attribution)
    {
        $attribution = $this->attributionService->update($attribution, $request->all());
        $attribution->load(['personne', 'organisation.nature', 'fonction']);
        return new AttributionResource($attribution);
    }

    /**
     * Update the specified resource in storage.
     */
    public function destroy(Attribution $attribution)
    {
        $attribution->delete();
    }
}
