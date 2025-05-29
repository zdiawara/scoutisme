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
                    ['nom' => 'Créer', 'code' => 'creer', 'description' => 'Créer et modifier un scout dans le système'],
                    ['nom' => 'Consulter', 'code' => 'consulter', 'description' => "Consulter les détails d'un scout"],
                    ['nom' => 'Affecter', 'code' => 'affecter', 'description' => "Affecter un scout dans une unité"]
                ]
            ],

            [
                'nom' => 'Adultes',
                'code' => 'adultes',
                'fonctionnalites' => [
                    ['nom' => 'Créer', 'code' => 'creer', 'description' => 'Créer et modifier un adulte dans le système'],
                    ['nom' => 'Consulter', 'code' => 'consulter', 'description' => "Consulter les détails d'un adulte"],
                    ['nom' => 'Affecter', 'code' => 'affecter', 'description' => "Affecter un adulte dans une organisation"]
                ]
            ],
        ]
    ];

    const MODULE_ORGANISATION =  [
        "nom" => 'Organisations',
        'code' => 'organisations',
        'sous_modules' => [
            [
                'nom' => 'Unité',
                'code' => 'unite',
                'fonctionnalites' => [
                    ['nom' => 'Créer', 'code' => 'creer', 'description' => 'Créer et modifier une unité dans le système'],
                    ['nom' => 'Consulter', 'code' => 'consulter', 'description' => "Consulter les informations d'une unité"],
                    ['nom' => 'Direction', 'code' => 'direction', 'description' => "Constituer les membres de l'organe de direction"],
                ]
            ],
            [
                'nom' => 'Groupe',
                'code' => 'groupe',
                'fonctionnalites' => [
                    ['nom' => 'Créer', 'code' => 'creer', 'description' => 'Créer et modifier un groupe dans le système'],
                    ['nom' => 'Consulter', 'code' => 'consulter', 'description' => "Consulter les informations d'un groupe"],
                    ['nom' => 'Direction', 'code' => 'direction', 'description' => "Constituer les membres de l'organe de direction"],
                ]
            ],
            [
                'nom' => 'Région',
                'code' => 'region',
                'fonctionnalites' => [
                    ['nom' => 'Créer', 'code' => 'creer', 'description' => 'Créer et modifier une région dans le système'],
                    ['nom' => 'Consulter', 'code' => 'consulter', 'description' => "Consulter les informations d'une région"],
                    ['nom' => 'Direction', 'code' => 'direction', 'description' => "Constituer les membres de l'organe de direction"],
                ]
            ],
            [
                'nom' => 'Equipe nationale',
                'code' => 'equipe_nationale',
                'fonctionnalites' => [
                    ['nom' => 'Modifier', 'code' => 'modifier', 'description' => "Modifier les informations de l'équipe nationale"],
                    ['nom' => 'Consulter', 'code' => 'consulter', 'description' => "Consulter les informations de l'équipe nationale"],
                    ['nom' => 'Direction', 'code' => 'direction', 'description' => "Constituer les membres de l'organe de direction"],
                ]
            ],
            [
                'nom' => 'Conseil national',
                'code' => 'conseil_national',
                'fonctionnalites' => [
                    ['nom' => 'Modifier', 'code' => 'modifier', 'description' => "Modifier les informations du conseil national"],
                    ['nom' => 'Consulter', 'code' => 'consulter', 'description' => "Consulter les informations du conseil national"],
                    ['nom' => 'Direction', 'code' => 'direction', 'description' => "Constituer les membres de l'organe de direction"],
                ]
            ],
        ]
    ];

    const MODULE_PAIEMENT =  [
        "nom" => 'Paiements',
        'code' => 'paiements',
        'sous_modules' => [
            [
                'nom' => 'Paiements',
                'code' => 'paiements',
                'fonctionnalites' => [
                    ['nom' => 'Créer', 'code' => 'creer', 'description' => "Créer et modifier les paiements des membres de son organisation"],
                    ['nom' => 'Valider', 'code' => 'valider', 'description' => "Valider les paiements soumis"],
                    ['nom' => 'Rejeter', 'code' => 'rejeter', 'description' => "Rejeter les paiements quand ils ne sont pas recus"],
                    ['nom' => 'Consulter', 'code' => 'consulter', 'description' => "Consulter les paiements effectués"],
                    ['nom' => 'Télécharger récu', 'code' => 'telecharger_recu', 'description' => "Télécharger le récu des paiements validés"],
                ]
            ],
        ]
    ];

    const MODULE_MAIL =  [
        "nom" => 'Mails',
        'code' => 'mails',
        'sous_modules' => [
            [
                'nom' => 'Mails',
                'code' => 'mails',
                'fonctionnalites' => [
                    ['nom' => 'Envoyer mail', 'code' => 'envoyer', "description" => "Envoyer des mails aux membres de son organisation"],
                ]
            ],
        ]
    ];

    /*     const MODULE_DASHBORD =  [
        "nom" => 'Dashbord',
        'code' => 'dashbord',
        'sous_modules' => [
            [
                'nom' => 'Personnes',
                'code' => 'dashbord_personne',
                'fonctionnalites' => [
                    ['nom' => 'Scou', 'code' => 'creer'],
                    ['nom' => 'Modifier', 'code' => 'modifier'],
                    ['nom' => 'Consulter', 'code' => 'consulter'],
                ]
            ],
        ]
    ]; */
}
