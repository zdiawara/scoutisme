<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CotisationResource;
use App\Http\Resources\PaiementResource;
use App\Http\Services\CotisationService;
use App\Http\Services\PaiementService;
use App\Models\Cotisation;
use App\Models\Instance;
use App\Models\Paiement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaiementController extends Controller
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

        $query = Paiement::query();

        if ($request->has('personneId') || $request->has('annee')) {
            $query->join('cotisations', function ($builder) {
                $builder->on('cotisations.id', 'paiements.cotisation_id');
            });
            if ($request->has('personneId')) {
                $query->where('cotisations.personne_id', $request->get('personneId'));
            }
            if ($request->has('annee')) {
                $query->where('cotisations.annee', $request->get('annee'));
            }
        }

        $result = $this->addPaging($request, $query);

        $projection = explode(";", $request->get('projection', 'paiements.*'));

        $data = $result['query']
            ->select($projection)
            ->orderBy('paiements.created_at', 'desc')
            ->with(['cotisation.personne'])
            ->get();

        return [
            'data' => PaiementResource::collection($data),
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
        $this->paiementService->create($cotisation->id, $request->input('montant'));
        DB::commit();
        return new CotisationResource($cotisation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cotisation $cotisation)
    {
        //return new CotisationResource($this->cotisationService->update($cotisation, $request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Instance $instance)
    {
        return new CotisationResource($instance);
    }

    public function valider(Paiement $paiement)
    {
        $paiement = $this->paiementService->valider($paiement);
        return new PaiementResource($paiement);
    }
}
