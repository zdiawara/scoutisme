<?php

namespace App\Http\Services;

use App\Http\Resources\PersonneCollection;
use App\ModelFilters\PersonneFilter;
use App\Models\Personne;

class PersonneService
{

    public function readPersonnes(array $filters): PersonneCollection
    {
        $data = Personne::filter($filters, PersonneFilter::class)
            ->paginate(10);
        return new PersonneCollection($data);
    }

    public function create(array $body): Personne
    {
        // Available alpha caracters
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // generate a pin based on 2 * 7 digits + a random character
        $pin = mt_rand(1000000, 9999999)
            . mt_rand(1000000, 9999999)
            . $characters[rand(0, strlen($characters) - 1)];

        // shuffle the result
        $string = str_shuffle($pin);
        return Personne::create(array_merge($body, ['code' => $string]));
    }

    public function update(Personne $personne, array $body)
    {
        $personne->update($body);
        return $personne;
    }
}
