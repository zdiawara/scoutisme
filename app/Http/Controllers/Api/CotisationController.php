<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CotisationResource;
use App\Http\Services\CotisationService;
use App\Http\Services\PaiementService;
use App\ModelFilters\CotisationFilter;
use App\Models\Cotisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
    public function index(Request $request): array
    {
        $query = Cotisation::filter($request->all(), CotisationFilter::class);
        $result = $this->addPaging($request, $query);

        $data = $result['query']
            ->orderBy('created_at', 'desc')
            ->with(['personne', 'paiements.createur', 'paiements.valideur'])
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

        try {
            $cotisation = $this->cotisationService->find($request->get('_personne_id'), $request->get('annee'));
            $this->paiementService->create($cotisation->id, $request->input('montant_paye'));

            DB::commit();

            Log::info('Paiement de cotisation enregistré', [
                'cotisation_id' => $cotisation->id,
                'personne_id' => $request->get('personne_id'),
                'annee' => $request->get('annee'),
            ]);

            return new CotisationResource($cotisation);
        } catch (\Throwable $exception) {
            DB::rollBack();

            Log::error('Échec de l\'enregistrement du paiement de cotisation', [
                'personne_id' => $request->get('personne_id'),
                'annee' => $request->get('annee'),
                'message' => $exception->getMessage(),
            ]);

            throw $exception;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Cotisation $instance)
    {
        return new CotisationResource($instance);
    }
}
