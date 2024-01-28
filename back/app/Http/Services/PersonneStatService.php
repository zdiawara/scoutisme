<?php

namespace App\Http\Services;

use App\Helpers\Nature;
use Illuminate\Support\Facades\DB;

class PersonneStatService
{

    private OrganisationService $organisationService;
    private TypeOrganisationService $typeOrganisationService;

    public function __construct(OrganisationService $organisationService, TypeOrganisationService $typeOrganisationService)
    {
        $this->organisationService = $organisationService;
        $this->typeOrganisationService = $typeOrganisationService;
    }

    public function cotisationByScoutAndRegion()
    {
        $data = collect(DB::select("SELECT
                parent.nom,
                parent.id,
                SUM(
                    CASE
                        WHEN scouts.cotisation_a_jour IS NOT NULL THEN scouts.cotisation_a_jour
                        ELSE 0
                    END
                ) as cotisation_a_jour,
                SUM(
                    CASE
                        WHEN scouts.cotisation_non_a_jour IS NOT NULL THEN scouts.cotisation_non_a_jour
                        ELSE 0
                    END
                ) as cotisation_non_a_jour,
                scouts.type_id as type_id
            FROM
                organisations parent
                INNER JOIN natures n_parent on n_parent.id = parent.nature_id
                INNER JOIN (
                    SELECT
                        o.id AS orga_id, o.parents AS orga_parents, tuo.id AS type_id, SUM(
                            CASE
                                WHEN c.montant_restant = 0 THEN 1
                                ELSE 0
                            END
                        ) as cotisation_a_jour, SUM(
                            CASE
                                WHEN c.montant_restant != 0 THEN 1
                                ELSE 0
                            END
                        ) as cotisation_non_a_jour
                    FROM
                        personnes p
                        LEFT JOIN cotisations c on c.personne_id = p.id
                        INNER JOIN organisations o on o.id = p.organisation_id
                        INNER JOIN types_organisations tuo on tuo.id = o.type_id
                        INNER JOIN natures n on n.id = o.nature_id
                    WHERE
                        n.code = 'unite'
                        AND p.type = 'scout'
                        AND tuo.nature_id = n.id
                    GROUP BY
                        o.id, tuo.id
                ) scouts ON JSON_CONTAINS(
                    JSON_EXTRACT(
                        scouts.orga_parents, '$[*].id'
                    ), CONCAT('\"', parent.id, '\"')
                ) = 1
            WHERE
                n_parent.code = 'region'
            GROUP BY
                parent.id,
                scouts.type_id", []));

        $typesOrganisations = $this->typeOrganisationService->findByNature(Nature::UNITE);

        $items = $this->organisationService->findByNature(Nature::REGION)
            ->map(function ($organisation) use ($typesOrganisations, $data) {

                $lines =  $typesOrganisations->reduce(function ($prev, $typeOrganisation) use ($data, $organisation) {;

                    $orgs = $data->filter(function ($item) use ($typeOrganisation, $organisation) {
                        return $item->type_id === $typeOrganisation->id && $item->id === $organisation->id;
                    });

                    $cotisation_a_jour = $orgs->map(function ($item) {
                        return $item->cotisation_a_jour;
                    })->sum();

                    $cotisation_non_a_jour = $orgs->map(function ($item) {
                        return $item->cotisation_non_a_jour;
                    })->sum();

                    $prev[$typeOrganisation->code] = [
                        'cotisation_a_jour' => $cotisation_a_jour,
                        'cotisation_non_a_jour' => $cotisation_non_a_jour
                    ];
                    return $prev;
                }, []);

                //$cumul = collect($sums)->sum();
                $cumul = collect($lines)->reduce(function ($prev, $item) {
                    $prev['cotisation_a_jour'] += $item['cotisation_a_jour'];
                    $prev['cotisation_non_a_jour'] += $item['cotisation_non_a_jour'];
                    return $prev;
                }, [
                    'cotisation_a_jour' => 0,
                    'cotisation_non_a_jour' => 0
                ]);

                return array_merge([
                    'nom' => $organisation->nom,
                    'id' => $organisation->id,
                    'cumul' => $cumul,
                ], $lines);
            });


        return [
            'data' => $items,
            'headers' => array_merge(
                [[
                    'nom' => 'Région',
                    'code' => 'nom'
                ]],
                $typesOrganisations->map(function ($item) {
                    return [
                        'nom' => $item->membre,
                        'code' => $item->code
                    ];
                })->toArray(),
                [[
                    'nom' => 'Effectif',
                    'code' => 'cumul'
                ]]
            ),
            'headers_2' => array_merge(
                $typesOrganisations->flatMap(function ($item) {
                    return [
                        [
                            'nom' => "A jour",
                            'code' => $item->id . "_a_jour"
                        ],
                        [
                            'nom' => "Non à jour",
                            'code' => $item->id . "_non_a_jour"
                        ]
                    ];
                })->toArray(),
                [[
                    'nom' => 'A jour',
                    'code' => 'effectif_a_jour'
                ]],
                [[
                    'nom' => 'Non à jour',
                    'code' => 'effectif_non__a_jour'
                ]]
            )
        ];
    }
}
