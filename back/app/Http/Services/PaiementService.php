<?php

namespace App\Http\Services;

use App\Exceptions\BadRequestException;
use App\Models\Cotisation;
use App\Models\Paiement;
use Barryvdh\DomPDF\Facade\Pdf;
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

    public function update(Paiement $paiement, array $body): Paiement
    {
        if ($paiement->etat == "valide") {
            throw new BadRequestException("Le paiement est déjà validé");
        }
        $paiement->update($body);
        return $paiement;
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
            'commentaire' => collect($body)->get('commentaire', null),
            'valideur_id' => Auth()->user()->id
        ]);

        DB::commit();

        return $paiement;
    }

    public function delete(Paiement $paiement)
    {
        if ($paiement->etat == 'valide') {
            throw new BadRequestException("Impossible de rejeter ce paiement");
        }
        $paiement->delete();
    }

    public  function telechargerRecu(Paiement $paiement)
    {
        if ($paiement->etat != 'valide') {
            throw new BadRequestException("Impossible de fournir le récu pour un paiement non validé");
        }

        return  [
            'signataire' => [
                'nom' => 'Barro Mohammed',
            ],
            'personne' => [
                'nom' => 'Zakaridia DIAWARA',
            ],
            'montant' => [
                'paye' => '3 000 Frs',
                'reste' => '0 Frs'
            ],
            'paiement' => [
                'numero' => $paiement->numero,
                'date' => '20/10/2023',
                'motif' => 'Cotisation 2023'

            ],
            'association' => [
                'nom' => 'Association des scouts du Burkina Faso (ASBF)',
                'adresse' => '01 BP 2548 Ouagadougou 01 - Burkina Faso'
            ]
        ];
    }
}
