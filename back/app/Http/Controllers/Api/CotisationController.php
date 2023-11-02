<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CotisationResource;
use App\Http\Services\CotisationService;
use App\Http\Services\PaiementService;
use App\ModelFilters\CotisationFilter;
use App\Models\Cotisation;
use App\Models\Instance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CotisationController extends Controller
{

    private CotisationService $cotisationService;
    private PaiementService $paiementService;

    public function __construct(CotisationService $cotisationService, PaiementService $paiementService)
    {
        $this->cotisationService = $cotisationService;
        $this->paiementService = $paiementService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Cotisation::filter($request->all(), CotisationFilter::class);
        $result = $this->addPaging($request, $query);

        $data = $result['query']
            ->orderBy('created_at', 'desc')
            ->with(['personne'])
            ->get();

        return [
            'data' => CotisationResource::collection($data),
            'meta' => $result['meta'],
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        $cotisation = $this->cotisationService->findOrcreate($request->get('personne_id'), $request->get('annee'));
        $this->paiementService->create($cotisation->id, $request->input('montant_paye'));
        DB::commit();
        return new CotisationResource($cotisation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cotisation $cotisation)
    {
        return new CotisationResource($this->cotisationService->update($cotisation, $request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Instance $instance)
    {
        return new CotisationResource($instance);
    }
}
