<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Organisation;
use App\Models\TypeOrganisation;
use Illuminate\Support\Facades\DB;

class ScoutStatController extends Controller
{
    public function statByRegion()
    {

        $data = collect(DB::select("SELECT
            parent.nom,
            parent.id,
            SUM(
                CASE
                    WHEN nb_scouts.nb IS NOT NULL THEN nb_scouts.nb
                    ELSE 0
                END
            ) as nbscout,
            nb_scouts.type_id
        FROM organisations parent
            INNER JOIN natures n_parent on n_parent.id = parent.nature_id
            INNER JOIN (
                SELECT
                    o.id AS orga_id,
                    tuo.id AS type_id,
                    COUNT(a.id) AS nb,
                    o.parents
                FROM attributions a
                    INNER JOIN organisations o on o.id = a.organisation_id
                    INNER JOIN types_organisations tuo on tuo.id = o.type_id
                    INNER JOIN natures n on n.id = o.nature_id
                WHERE
                    n.code = 'unite'
                    AND a.type = 'scout'
                GROUP BY
                    o.id,
                    tuo.id
            ) nb_scouts ON JSON_CONTAINS(
                JSON_EXTRACT(nb_scouts.parents, '$[*].id'),
                CONCAT('\"', parent.id, '\"')
            ) = 1
        WHERE n_parent.code = 'region'
        GROUP BY
            parent.id,
            nb_scouts.type_id", []));

        $typesOrganisations = TypeOrganisation::orderBy('position', 'asc')
            ->get();

        $items = Organisation::whereHas('nature', function ($q) {
            $q->where('code', 'region');
        })->get()
            ->map(function ($organisation) use ($typesOrganisations, $data) {


                $sums =  $typesOrganisations->reduce(function ($prev, $typeOrganisation) use ($data, $organisation) {
                    $sum = $data->filter(function ($item) use ($typeOrganisation, $organisation) {
                        return $item->type_id === $typeOrganisation->id && $item->id === $organisation->id;
                    })->map(function ($item) {
                        return $item->nbscout;
                    })->sum();
                    $prev[$typeOrganisation->code] = $sum;
                    return $prev;
                }, []);

                $cumul = collect($sums)->sum();

                return array_merge([
                    'nom' => $organisation->nom,
                    'id' => $organisation->id,
                    'cumul' => $cumul

                ], $sums);
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
            )
        ];
    }

    public function scoutByGenre()
    {

        $data = collect(DB::select("SELECT
            parent.nom,
            parent.id,
            SUM(
                CASE
                    WHEN nb_scouts.homme IS NOT NULL THEN nb_scouts.homme
                    ELSE 0
                END
            ) as homme,
            SUM(
                CASE
                    WHEN nb_scouts.femme IS NOT NULL THEN nb_scouts.femme
                    ELSE 0
                END
            ) as femme,
            nb_scouts.type_id
            FROM organisations parent
                INNER JOIN natures n_parent on n_parent.id = parent.nature_id
                INNER JOIN (
                    SELECT
                        o.id AS orga_id,
                        tuo.id AS type_id,
                        SUM(
                            CASE
                                WHEN g.code = 'h' THEN 1
                                ELSE 0
                            END
                        ) as homme,
                        SUM(
                            CASE
                                WHEN g.code = 'f' THEN 1
                                ELSE 0
                            END
                        ) as femme,
                        o.parents
                    FROM attributions a
                        INNER JOIN organisations o on o.id = a.organisation_id
                        INNER JOIN types_organisations tuo on tuo.id = o.type_id
                        INNER JOIN natures n on n.id = o.nature_id
                        INNER JOIN personnes p on p.id = a.personne_id
                        INNER JOIN genres g on g.id = p.genre_id
                    WHERE
                        n.code = 'unite'
                        AND a.type = 'scout'
                    GROUP BY
                        o.id,
                        tuo.id
                ) nb_scouts ON JSON_CONTAINS(
                    JSON_EXTRACT(nb_scouts.parents, '$[*].id'),
                    CONCAT('\"', parent.id, '\"')
                ) = 1
            WHERE n_parent.code = 'region'
            GROUP BY
                parent.id,
                nb_scouts.type_id", []));

        $typesOrganisations = TypeOrganisation::all();

        $items = Organisation::whereHas('nature', function ($q) {
            $q->where('code', 'region');
        })->get()
            ->map(function ($organisation) use ($typesOrganisations, $data) {


                $sums =  $typesOrganisations->reduce(function ($prev, $typeOrganisation) use ($data, $organisation) {
                    $sum = $data->filter(function ($item) use ($typeOrganisation, $organisation) {
                        return $item->type_id === $typeOrganisation->id && $item->id === $organisation->id;
                    })->map(function ($item) {
                        return $item->homme + $item->femme;
                    })->sum();
                    $prev[$typeOrganisation->code] = $sum;
                    return $prev;
                }, []);

                $cumul = collect($sums)->sum();

                return array_merge([
                    'nom' => $organisation->nom,
                    'id' => $organisation->id,
                    'cumul' => $cumul

                ], $sums);
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
                        'nom' => $item->nom,
                        'code' => $item->code
                    ];
                })->toArray(),
                [[
                    'nom' => 'Effectif',
                    'code' => 'cumul'
                ]]
            )
        ];
    }
}
