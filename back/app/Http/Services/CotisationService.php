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
        return $cotisation;
    }

    public function create(string $personneId, string $annee)
    {
        $cotisation = Cotisation::where('annee', $annee)
            ->where('personne_id', $personneId)
            ->first();

        if ($cotisation == null) {
            $montantTotal = $this->montantCotisationService->findMontant($personneId);
            return Cotisation::create([
                'annee' => $annee,
                'personne_id' => $personneId,
                'montant_total' => $montantTotal,
                'montant_restant' => $montantTotal,
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
