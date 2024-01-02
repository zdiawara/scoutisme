<?php

namespace App\Http\Services;

use App\Models\Attribution;
use Illuminate\Support\Facades\DB;

class AttributionService
{

    public function create(array $body): Attribution
    {
        dd($body);
        // Cloturer attribution  existante
        Attribution::where('personne_id', $body['personne_id'])
            ->where('date_debut', '<=', now())
            ->where(function ($q) {
                $q->whereNull('date_fin')
                    ->orWhere('date_fin', '>=', now());
            })
            ->update([
                'date_fin' => now()
            ]);

        // Création de l'attribution
        $attribution = Attribution::create($body);

        $this->updatePersonne($attribution);

        return $attribution;
    }

    public function update(Attribution $attribution, array $body)
    {
        $attribution->update($body);
        $this->updatePersonne($attribution);
        return $attribution;
    }

    public function cloturer(Attribution $attribution, array $body)
    {
        DB::beginTransaction();
        $attribution->update([
            'date_fin' => collect($body)->get('date_fin')
        ]);
        $this->updatePersonne($attribution);
        DB::commit();
        return $attribution;
    }

    private function updatePersonne(Attribution $attribution)
    {
        // Mettre à jour la personne
        $attribution->personne->update([
            'fonction_id' => $attribution->fonction_id,
            'organisation_id' => $attribution->organisation_id,
            'date_debut' => $attribution->date_debut,
            'date_fin' => $attribution->date_fin,
        ]);
    }

    public function delete(Attribution $attribution)
    {
        $attribution->delete();
        $attribution->personne->update([
            'fonction_id' => null,
            'organisation_id' => null,
            'date_debut' => null,
            'date_fin' => null,
        ]);
    }
}
