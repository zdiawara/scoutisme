<?php

namespace App\Helpers;

class Modules
{
    const MODULE_PERSONNE =  [
        "nom" => 'Personnes',
        'code' => 'personnes',
        'sous_modules' => [

            [
                'nom' => 'Scouts',
                'code' => 'scouts',
                'fonctionnalites' => [
                    ['nom' => 'Créer', 'code' => 'creer'],
                    ['nom' => 'Modifier', 'code' => 'modifier'],
                    ['nom' => 'Consulter', 'code' => 'consulter']
                ]
            ],

            [
                'nom' => 'Adultes',
                'code' => 'adultes',
                'fonctionnalites' => [
                    ['nom' => 'Créer', 'code' => 'creer'],
                    ['nom' => 'Modifier', 'code' => 'modifier'],
                    ['nom' => 'Consulter', 'code' => 'consulter']
                ]
            ],

            [
                'nom' => 'Fonctions',
                'code' => 'fonctions',
                'fonctionnalites' => [
                    ['nom' => 'Affecter', 'code' => 'affecter'],
                    ['nom' => 'Consulter', 'code' => 'consulter'],
                    ['nom' => 'Supprimer', 'code' => 'supprimer'],
                ]
            ],

            [
                'nom' => 'Paiements',
                'code' => 'paiements',
                'fonctionnalites' => [
                    ['nom' => 'Créer', 'code' => 'creer'],
                    ['nom' => 'Modifier', 'code' => 'modifier'],
                    ['nom' => 'Consulter', 'code' => 'consulter'],
                    ['nom' => 'Supprimer', 'code' => 'supprimer'],
                    ['nom' => 'Valider', 'code' => 'valider'],
                    ['nom' => 'Rejeter', 'code' => 'rejeter'],
                    ['nom' => 'Télécharger récu', 'code' => 'telecharger_recu'],
                ]
            ],

        ]
    ];

    const MODULE_ORGANISATION =  [
        "nom" => 'Organisations',
        'code' => 'organisations',
        'sous_modules' => [
            [
                'nom' => 'Organisations',
                'code' => 'organisations',
                'fonctionnalites' => [
                    ['nom' => 'Créer', 'code' => 'creer'],
                    ['nom' => 'Modifier', 'code' => 'modifier'],
                    ['nom' => 'Consulter', 'code' => 'consulter'],
                ]
            ],
        ]
    ];
}
