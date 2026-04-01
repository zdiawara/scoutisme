<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\RefFormationService;
use App\Models\RefFormation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RefFormationController extends Controller
{
    private $refFormationService;

    public function __construct(RefFormationService $refFormationService)
    {
        $this->refFormationService = $refFormationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            'data' => RefFormation::query()
                ->orderBy('nom', 'asc')
                ->get()
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $refFormation = $this->refFormationService->create($request->all());

        Log::info('Référence de formation créée via API', [
            'ref_formation_id' => $refFormation->id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(RefFormation $refFormation)
    {
        return response()->json($refFormation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RefFormation $refFormation)
    {
        $refFormation = $this->refFormationService->update($refFormation, $request->except(['code']));

        Log::info('Référence de formation mise à jour via API', [
            'ref_formation_id' => $refFormation->id,
        ]);
    }
}
