<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributionResource;
use App\Http\Services\TransfertService;
use App\Models\Attribution;
use App\Models\Transfert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransfertController extends Controller
{
    private TransfertService $transfertService;

    public function __construct(TransfertService $transfertService)
    {
        $this->transfertService = $transfertService;
    }

    public function confirmer(Transfert $transfert)
    {
        $this->authorize('confirmTransfer', $transfert);

        $this->transfertService->confirmer($transfert);

        Log::info('Transfert confirmé via API', [
            'transfert_id' => $transfert->id,
            'numero' => $transfert->numero,
        ]);
    }
}
