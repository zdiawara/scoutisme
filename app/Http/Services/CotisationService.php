<?php

namespace App\Http\Services;

use App\Exceptions\BadRequestException;
use App\Models\Cotisation;
use App\Models\Paiement;

class CotisationService
{
    private MontantCotisationService $montantCotisationService;

    public function __construct(
        MontantCotisationService $montantCotisationService
    ) {
        $this->montantCotisationService = $montantCotisationService;
    }

    public function find(string $personneId, string $annee)
    {
        $cotisation = Cotisation::where('annee', $annee)
            ->where('personne_id', $personneId)
            ->first();
        if (intval($annee) < date("Y")) {
            return null;
        }

        if ($cotisation == null) {
            $cotisation = $this->create($personneId, $annee);
        }

        $cotisation->load(['paiements.createur', 'paiements.valideur']);

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

        if ($montant_paye > $cotisation->montant_total) {
            throw new BadRequestException("La somme des montants soumis doit être inférieur à " . $cotisation->montant_total);
        }

        $cotisation->update([
            'montant_paye' => $montant_paye,
            'montant_restant' => $cotisation->montant_total - $montant_paye
        ]);

        $montantTotal = Paiement::where('cotisation_id', $cotisation->id)
            ->where('etat', 'valide')
            ->sum('montant');

        if ($montantTotal >= $cotisation->montant_total) {
            $cotisation->update([
                'etat' => 'a_jour'
            ]);
        }
    }
}
