<?php

namespace App\Http\Services;

use App\Models\TypeOrganisation;
use Illuminate\Support\Facades\Log;

class TypeOrganisationService
{
    public function create(array $body): TypeOrganisation
    {
        // Available alpha caracters
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // generate a pin based on 2 * 7 digits + a random character
        $pin = mt_rand(1000000, 9999999)
            . mt_rand(1000000, 9999999)
            . $characters[rand(0, strlen($characters) - 1)];

        // shuffle the result
        $string = str_shuffle($pin);
        $typeOrganisation = TypeOrganisation::create(array_merge($body, ['code' => $string]));

        Log::info('Type d\'organisation créé', [
            'type_organisation_id' => $typeOrganisation->id,
            'code' => $typeOrganisation->code,
        ]);

        return $typeOrganisation;
    }

    public function update(TypeOrganisation $typeOrganisation, array $body): TypeOrganisation
    {
        $typeOrganisation->update($body);

        Log::info('Type d\'organisation mis à jour', [
            'type_organisation_id' => $typeOrganisation->id,
        ]);

        return $typeOrganisation;
    }

    public function findByNature(string $nature)
    {
        return TypeOrganisation::whereHas('nature', function ($q) use ($nature) {
            $q->where('code', $nature);
        })->orderBy('position', 'asc')
            ->get();
    }
}
