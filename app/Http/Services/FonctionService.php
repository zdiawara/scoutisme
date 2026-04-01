<?php

namespace App\Http\Services;

use App\Models\Fonction;
use Illuminate\Support\Facades\Log;

class FonctionService
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
        $fonction = Fonction::create(array_merge($body, ['code' => $string, 'dure_mandat' => 0]));

        Log::info('Fonction créée', [
            'fonction_id' => $fonction->id,
            'code' => $fonction->code,
        ]);

        return $fonction;
    }

    public function update(Fonction $fonction, array $body)
    {
        $fonction->update($body);

        Log::info('Fonction mise à jour', [
            'fonction_id' => $fonction->id,
        ]);

        return $fonction;
    }
}
