<?php

namespace App\Http\Services;

use App\Http\Resources\PersonneCollection;
use App\ModelFilters\PersonneFilter;
use App\Models\Attribution;
use App\Models\Fonction;
use App\Models\Personne;
use Illuminate\Support\Facades\DB;

class PersonneService
{

    private AttributionService $attributinService;

    public function __construct(AttributionService $attributinService)
    {
        $this->attributinService = $attributinService;
    }

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

        $bodyCollection = collect($body);

        DB::beginTransaction();

        $attribution = [];

        if ($bodyCollection->has('attribution')) {
            $attributionInput = collect($bodyCollection->get('attribution'));
            $attribution = [
                'organisation_id' => $attributionInput->get("organisation_id"),
                'date_debut' => now(),
                'fonction_id' => $body['type'] === "scout" ? Fonction::where('code', 'scout')->first()->id : $attributionInput->get('fonction_id'),
                'type' => $body['type'] === "scout" ? 'scout' : 'direction'
            ];
        }

        $personne = Personne::create($bodyCollection->except("attribution")
            ->merge(['code' => $string])
            ->merge($attribution)
            ->all());

        DB::commit();

        return $personne;
    }

    public function update(Personne $personne, array $body)
    {
        $personne->update($body);
        return $personne;
    }

    public function readPersonnesSansFonction($params)
    {
        return DB::select(
            'SELECT p.nom, p.prenom, p.id FROM personnes p WHERE p.type = :type and 
                (p.organisation_id is null or p.fonction_id is null or p.date_fin < now())',
            ['type' => $params['type'] ?? null]
        );
    }

    public function affecter(Personne $personne, array $body): Personne
    {
        $personne->update(collect($body)->only([
            'fonction_id', 'organisation_id', 'date_debut', 'date_fin'
        ])->toArray());

        return $personne;
    }
}
