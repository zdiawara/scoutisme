<?php

namespace App\Http\Services;

use App\Http\Resources\PersonneCollection;
use App\ModelFilters\PersonneFilter;
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

        $personne = Personne::create($bodyCollection->except("attribution")
            ->merge(['code' => $string])
            ->all());

        if ($bodyCollection->has('attribution')) {
            $attribution = collect($bodyCollection->get('attribution'));
            $attributionInput = [
                'organisation_id' => $attribution->get("organisation_id"),
                'fonction_id' => $attribution->get('fonction_id'),
                'personne_id' => $personne->id,
                'date_debut' => $attribution->get('date_debut'),
                'date_fin' => $attribution->get('date_fin'),
            ];
            $this->attributinService->create($attributionInput);
        }

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
                (p.date_debut is null or (p.fonction_id is not null and p.date_fin is not null and p.date_fin < now()))',
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
