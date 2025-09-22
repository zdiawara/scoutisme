<?php

namespace App\Http\Helper;

class CodeOrganisationHelper
{

    public static function buildCode(string $nomOrganisation)
    {
        $nomSansAccents = iconv('UTF-8', 'ASCII//TRANSLIT', $nomOrganisation);

        $nomNettoye = preg_replace('/[^A-Za-z0-9]/', '', $nomSansAccents);

        $nom = strtoupper($nomNettoye);

        return substr(str_pad($nom, 4, "X", STR_PAD_RIGHT), 0, 4);
    }
}
