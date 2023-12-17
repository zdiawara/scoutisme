<?php

namespace App\Http\Services;

use App\Models\Attribution;

class AttributionService
{

    public function create(array $body): Attribution
    {
        // Cloturer attribution  existante
        Attribution::where('fonction_id', $body['fonction_id'])
            ->where('organisation_id', $body['organisation_id'])
            ->where('personne_id', $body['personne_id'])
            ->where('date_debut', '<=', now())
            ->where(function ($q) {
                $q->whereNull('date_fin')
                    ->orWhere('date_fin', '>=', now());
            })
            ->update([
                'date_fin' => now()
            ]);


        return Attribution::create($body);
    }

    public function update(Attribution $attribution, array $body)
    {
        $attribution->update($body);
        return $attribution;
    }

    public function cloturer(Attribution $attribution, array $body)
    {
        $attribution->update(collect($body)->get('date_fin'));
        return $attribution;
    }
}
