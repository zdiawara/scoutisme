<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributionResource;
use App\Http\Services\TransfertService;
use App\Models\Attribution;
use App\Models\Transfert;
use Illuminate\Http\Request;

class TransfertController extends Controller
{
    private TransfertService $transfertService;

    public function __construct(TransfertService $transfertService)
    {
        $this->transfertService = $transfertService;
    }



    public function confirmer(Transfert $transfert)
    {
        $this->transfertService->confirmer($transfert);
        return [];
    }
}
