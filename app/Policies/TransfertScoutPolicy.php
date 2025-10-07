<?php

namespace App\Policies;

use App\Http\Services\AttributionService;
use App\Models\Transfert;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TransfertScoutPolicy
{
    private AttributionService $attributionService;

    public function __construct(AttributionService $attributionService)
    {
        $this->attributionService = $attributionService;
    }

    public function confirmTransfer(User $user, Transfert $transfert)
    {
        $attributionChefUnite = $this->attributionService->findResponsable($transfert->unite_arrivee_id);

        if (!isset($attributionChefUnite)) {
            return Response::deny("Aucun chef d'unité positionné sur l'unité " . $transfert->uniteArrivee->nom);
        }

        if (!isset($user->personne)) {
            return Response::deny("Aucune personne associée à l'utilisateur " . $user->name);
        }

        if ($user->personne->id != $attributionChefUnite->personne_id) {
            return Response::deny("Vous n’avez pas les droits nécessaires pour valider ce transfert.");
        }

        return Response::allow();
    }
}
