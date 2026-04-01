<?php

namespace App\Http\Services;

use App\Models\Attribution;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AttributionService
{

    private CotisationService $cotisationService;

    public function __construct(
        CotisationService $cotisationService,
    ) {
        $this->cotisationService = $cotisationService;
    }


    public function create(array $body): Attribution
    {
        DB::beginTransaction();

        // Cloturer attribution  existante
        Attribution::where('personne_id', $body['personne_id'])
            ->where('date_debut', '<=', now())
            ->where(function ($q) {
                $q->whereNull('date_fin')
                    ->orWhere('date_fin', '>=', now());
            })
            ->update([
                'date_fin' => $body['date_debut'] ?? now()
            ]);

        // Création de la nouvelle attribution
        $attribution = Attribution::create($body);

        $this->updatePersonne($attribution);

        // Créer une ligne de cotisation
        $this->cotisationService->create($body['personne_id'], date('Y'));

        DB::commit();

        Log::info('Attribution créée', [
            'attribution_id' => $attribution->id,
            'personne_id' => $attribution->personne_id,
            'organisation_id' => $attribution->organisation_id,
            'fonction_id' => $attribution->fonction_id,
        ]);

        return $attribution;
    }

    public function update(Attribution $attribution, array $body)
    {
        DB::beginTransaction();
        $attribution->update($body);
        $this->updatePersonne($attribution);
        DB::commit();

        Log::info('Attribution mise à jour', [
            'attribution_id' => $attribution->id,
        ]);

        return $attribution;
    }

    public function cloturer(Attribution $attribution, array $body = [])
    {
        DB::beginTransaction();
        $attribution->update([
            'date_fin' => collect($body)->get('date_fin', now())
        ]);
        $this->updatePersonne($attribution);
        DB::commit();

        Log::info('Attribution clôturée', [
            'attribution_id' => $attribution->id,
            'date_fin' => $attribution->date_fin,
        ]);

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
        $attributionId = $attribution->id;
        $personneId = $attribution->personne_id;

        $attribution->delete();
        $attribution->personne->update([
            'fonction_id' => null,
            'organisation_id' => null,
            'date_debut' => null,
            'date_fin' => null,
        ]);

        Log::info('Attribution supprimée', [
            'attribution_id' => $attributionId,
            'personne_id' => $personneId,
        ]);
    }


    public function findResponsable(string $organisationId): Attribution  | null
    {
        return Attribution::where('organisation_id', $organisationId)
            ->where('date_debut', '<=', now())
            ->where(function ($q) {
                $q->whereNull('date_fin')
                    ->orWhere('date_fin', '>=', now());
            })
            ->whereHas('fonction', function ($query) {
                $query->where('responsable', true);
            })
            ->first();
    }
}
