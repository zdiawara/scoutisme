<?php

namespace App\Http\Services;

use App\Models\Organisation;
use Illuminate\Support\Facades\DB;

class OrganisationService
{
    public function create(array $body)
    {
        // Available alpha caracters
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // generate a pin based on 2 * 7 digits + a random character
        $pin = mt_rand(1000000, 9999999)
            . mt_rand(1000000, 9999999)
            . $characters[rand(0, strlen($characters) - 1)];

        // shuffle the result
        $string = str_shuffle($pin);
        return Organisation::create(array_merge($body, ['code' => $string]));
    }

    public function update(Organisation $organisation, array $body)
    {
        $organisation->update($body);
        return $organisation;
    }

    public function readDirection(string $organisationId, $body)
    {
        $typeId = collect($body)->get('typeId', null);

        $data = collect(DB::select(
            'SELECT a.id, a.date_debut, a.date_fin, f.type_id,
                IF(p.id is not null, 
                    JSON_OBJECT("id", CAST(p.id AS CHAR(200)), "nom", p.nom, "prenom", p.prenom, "photo" , null), 
                    null
                ) as personne,

                JSON_OBJECT("id", CAST(f.id AS CHAR(200)), "nom", f.nom) as fonction

            FROM fonctions f 
                INNER JOIN organisations o on o.nature_id = f.nature_id
                LEFT JOIN attributions a on (a.fonction_id = f.id and a.organisation_id = o.id and a.date_fin is null )
                LEFT JOIN personnes p on p.id = a.personne_id
            WHERE o.id = :organisationId and f.code != "scout";
            ',
            ['organisationId' => $organisationId]
        ))->map(function ($item) {
            $item->personne = json_decode($item->personne);
            $item->fonction = json_decode($item->fonction);
            return $item;
        });

        if ($typeId != null) {
            return $data->filter(function ($item) use ($typeId) {
                return $item->type_id == $typeId;
            })->values();
        }
        return $data->values();
    }
}
