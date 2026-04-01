<?php

namespace App\Http\Services;

use App\Exceptions\BadRequestException;
use App\Models\Cotisation;
use App\Models\Paiement;
use Illuminate\Support\Facades\Log;

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
            $newCotisation = Cotisation::create([
                'annee' => $annee,
                'personne_id' => $personneId,
                'montant_total' => $montantTotal,
                'montant_restant' => $montantTotal,
            ]);

            Log::info('Cotisation créée automatiquement', [
                'cotisation_id' => $newCotisation->id,
                'personne_id' => $personneId,
                'annee' => $annee,
                'montant_total' => $montantTotal,
            ]);

            return $newCotisation;
        }

        return $cotisation;
    }

    public function updateMontant(Cotisation $cotisation, $montant)
    {
        $montant_paye = intval($montant) + $cotisation->montant_paye;

        if ($montant_paye > $cotisation->montant_total) {
            Log::warning('Mise à jour refusée: montant cumulé supérieur au montant total', [
                'cotisation_id' => $cotisation->id,
                'montant_paye_calcule' => $montant_paye,
                'montant_total' => $cotisation->montant_total,
            ]);
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

            Log::info('Cotisation marquée à jour', [
                'cotisation_id' => $cotisation->id,
                'montant_valide_total' => $montantTotal,
                'montant_total' => $cotisation->montant_total,
            ]);
        }
    }
}
