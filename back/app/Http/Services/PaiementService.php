<?php

namespace App\Http\Services;

use App\Exceptions\BadRequestException;
use App\Models\Cotisation;
use App\Models\Paiement;
use sirajcse\UniqueIdGenerator\UniqueIdGenerator;
use Illuminate\Support\Facades\DB;

class PaiementService
{

    private CotisationService $cotisationService;
    private array $config;

    public function __construct(CotisationService $cotisationService)
    {
        $this->cotisationService = $cotisationService;
        $prefix = date("ym");
        $this->config = [
            'table' => 'paiements', 'field' => 'numero', 'length' => 8, 'prefix' => $prefix . '-', 'reset_on_change' => 'prefix'
        ];
    }

    public function create(string $cotisationId, $montant)
    {
        $cotisation = Cotisation::findOrFail($cotisationId);

        Paiement::create([
            'cotisation_id' => $cotisation->id,
            'montant' => $montant,
            'etat' => 'en_attente',
            'numero' => UniqueIdGenerator::generate($this->config)
        ]);

        return $cotisation;
    }

    public function update(Cotisation $cotisation, array $body)
    {
        $cotisation->update($body);
        return $cotisation;
    }

    public function valider(Paiement $paiement)
    {

        if ($paiement->etat != 'en_attente') {
            throw new BadRequestException("Impossible de valider ce paiement");
        }

        DB::beginTransaction();

        $this->cotisationService->updateMontant($paiement->cotisation, $paiement->montant);

        $paiement->update([
            'etat' => 'valide',
            'date_traitement' => now(),
            //'valideur_id' => ''
        ]);

        DB::commit();

        return $paiement;
    }


    public function rejeter(Paiement $paiement, array $body)
    {

        if ($paiement->etat != 'en_attente') {
            throw new BadRequestException("Impossible de rejeter ce paiement");
        }

        DB::beginTransaction();

        $paiement->update([
            'etat' => 'rejet',
            'date_traitement' => now(),
            'commentaire' => collect($body)->get('commentaire', null)
            //'valideur_id' => ''
        ]);

        DB::commit();

        return $paiement;
    }
}
