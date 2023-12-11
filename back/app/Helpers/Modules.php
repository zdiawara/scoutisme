<?php

namespace App\Helpers;

class Modules
{
    const PERSONNE =  [
        "nom" => 'Personnes',
        'code' => 'personnes',
        'fonctionnalites' => [
            ['nom' => 'Gérer scout', 'code' => 'gerer_scout'],
            ['nom' => 'Gérer adulte', 'code' => 'gerer_adulte'],

            ['nom' => 'Créer fonction', 'code' => 'creer_fonction'],
            ['nom' => 'Côturer fonction', 'code' => 'cloturer_fonction'],
            ['nom' => 'Supprimer fonction', 'code' => 'supprimer_fonction'],

            ['nom' => 'Gérer paiement', 'code' => 'gerer_paiement'],
            ['nom' => 'Valider paiement', 'code' => 'valider_paiement'],
            ['nom' => 'Rejeter paiement', 'code' => 'rejeter_paiement'],
            ['nom' => 'Télécharger récu', 'code' => 'telecharger_recu'],

        ]
    ];

    const ORGANISATION =  [
        "nom" => 'Organisations',
        'code' => 'organisations',
        'fonctionnalites' => [
            ['nom' => 'Gérer organisation', 'code' => 'gerer_organisation'],
            ['nom' => 'Gérer direction', 'code' => 'gerer_direction'],
            ['nom' => 'Affecter scout', 'code' => 'affecter_scout'],
        ]
    ];
}
