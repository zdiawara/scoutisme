<?php

namespace App\Http\Services;

use App\Http\Resources\PersonneCollection;
use App\ModelFilters\PersonneFilter;
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

        $personne = Personne::create($bodyCollection->except("attribution")
            ->merge(['code' => $string])->all());

        if ($bodyCollection->has('attribution')) {

            $attributionInput = collect($bodyCollection->get('attribution'));

            $attributionBody = collect([
                'personne_id' => $personne->id,
                'organisation_id' => $attributionInput->get("organisation_id"),
                'date_debut' => now(),
                'fonction_id' => $personne->type === "scout" ? Fonction::where('code', 'scout')->first()->id : $attributionInput->get('role_id'),
            ]);

            $this->attributinService->create($attributionBody->all());
        }
        DB::commit();

        return $personne;
    }

    public function update(Personne $personne, array $body)
    {
        $personne->update($body);
        return $personne;
    }

    public function createScout(array $body): Personne
    {
        $personne = $this->create(collect($body)->except("organisation_id")->all());

        $this->attributinService->create([
            'personne_id' => $personne->id,
            'organisation_id' => collect($body)->get("organisation_id"),
            'role_id' => Fonction::where('code', 'scout')->firstOrFailed()->id,
            'date_debut' => now(),
        ]);

        return $personne;
    }
}
