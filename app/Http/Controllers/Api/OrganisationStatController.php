<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class OrganisationStatController extends Controller
{
    public function statByRegion()
    {

        $data = DB::select("SELECT parent.nom, parent.id,
            SUM(
                CASE
                    WHEN enfant_nat.code = 'groupe' THEN 1
                    ELSE 0
                END
            ) as nombre_groupe,
            SUM(
                CASE
                    WHEN enfant_nat.code = 'unite' THEN 1
                    ELSE 0
                END
            ) as nombre_unite
        FROM organisations parent
            LEFT JOIN organisations enfant on JSON_CONTAINS(
                JSON_EXTRACT(enfant.parents, '$[*].id'), CONCAT('\"', parent.id, '\"')
            ) = 1
            LEFT JOIN natures n on n.id = parent.nature_id
            LEFT JOIN natures enfant_nat ON enfant_nat.id = enfant.nature_id
        WHERE n.code = 'region'
        GROUP BY parent.id
        ORDER BY parent.nom ASC", []);

        return [
            'data' => $data
        ];
    }

    public function countAll()
    {

        $data = DB::select("SELECT
            n.code,
            SUM(
                CASE
                    WHEN n.code = 'region' THEN 1
                    WHEN n.code = 'groupe' THEN 1
                    WHEN n.code = 'unite' THEN 1
                    WHEN n.code = 'national' THEN 1
                    ELSE 0
                END
            ) as nombre
            FROM natures n
                INNER JOIN organisations uo ON uo.nature_id = n.id
            GROUP BY n.id
            ORDER BY n.code ASC", []);

        return [
            'data' => $data
        ];
    }
}
