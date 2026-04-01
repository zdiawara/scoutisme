<?php

namespace App\Http\Services;

use App\Models\RefFormation;
use Illuminate\Support\Facades\Log;

class RefFormationService
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
        $refFormation = RefFormation::create(array_merge($body, ['code' => $string]));

        Log::info('Référence de formation créée', [
            'ref_formation_id' => $refFormation->id,
            'code' => $refFormation->code,
        ]);

        return $refFormation;
    }

    public function update(RefFormation $refFormation, array $body)
    {
        $refFormation->update($body);

        Log::info('Référence de formation mise à jour', [
            'ref_formation_id' => $refFormation->id,
        ]);

        return $refFormation;
    }
}
