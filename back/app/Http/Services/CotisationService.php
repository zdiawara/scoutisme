<?php

namespace App\Http\Services;

use App\Models\Cotisation;

class CotisationService
{
    private MontantCotisationService $montantCotisationService;

    public function __construct(MontantCotisationService $montantCotisationService)
    {
        $this->montantCotisationService = $montantCotisationService;
    }

    public function find(string $personneId, string $annee)
    {
        $cotisation = Cotisation::where('annee', $annee)
            ->where('personne_id', $personneId)
            ->first();

        /*         if ($cotisation == null) {
            return Cotisation::create([
                'annee' => $annee,
                'personne_id' => $personneId,
                'montant_total' => $this->montantCotisationService->findMontant($personneId),
                'paiements' => []
            ]);
        } */

        return $cotisation;
    }

    public function create(string $personneId, string $annee)
    {
        $cotisation = Cotisation::where('annee', $annee)
            ->where('personne_id', $personneId)
            ->first();

        if ($cotisation == null) {
            return Cotisation::create([
                'annee' => $annee,
                'personne_id' => $personneId,
                'montant_total' => $this->montantCotisationService->findMontant($personneId),
                'paiements' => []
            ]);
        }

        return $cotisation;
    }

    public function updateMontant(Cotisation $cotisation, $montant)
    {
        $montant_paye = intval($montant) + $cotisation->montant_paye;

        $cotisation->update([
            'montant_paye' => $montant_paye,
            'montant_restant' => $cotisation->montant_total - $montant_paye
        ]);

        return $cotisation;
    }
}
