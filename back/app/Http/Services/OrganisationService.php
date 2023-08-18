<?php

namespace App\Http\Services;

use App\Models\Organisation;

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
}
