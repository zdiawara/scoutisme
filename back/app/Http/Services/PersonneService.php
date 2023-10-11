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

        $personne = Personne::create($bodyCollection->except("attribution")
            ->merge(['code' => $string])->all());

        if ($bodyCollection->has('attribution')) {

            $attributionInput = collect($bodyCollection->get('attribution'));

            $this->attributinService->create([
                'personne_id' => $personne->id,
                'organisation_id' => $attributionInput->get("organisation_id"),
                'date_debut' => now(),
                'fonction_id' => $personne->type === "scout" ? Fonction::where('code', 'scout')->first()->id : $attributionInput->get('fonction_id'),
                'type' => $personne->type === "scout" ? 'scout' : 'direction'
            ]);
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
        return Personne::select('personnes.nom', 'personnes.prenom', 'personnes.id')
            ->leftJoin('attributions', function ($query) {
                $query->on('attributions.personne_id', 'personnes.id');
            })
            ->whereNull('attributions.id')
            ->where(function ($query) use ($params) {
                $query->where('personnes.type', $params['type']);
            })
            ->get();
    }

    public function affecter(string $personneId, array $body): Attribution
    {
        Attribution::where('fonction_id', $body['fonction_id'])
            ->where('organisation_id', $body['organisation_id'])
            ->where('date_debut', '<=', now())
            ->where(function ($q) {
                $q->whereNull('date_fin')
                    ->orWhere('date_fin', '>=', now());
            })
            ->update([
                'date_fin' => now()
            ]);

        Attribution::where('personne_id', $personneId)
            ->where('date_debut', '<=', now())
            ->where(function ($q) {
                $q->whereNull('date_fin')
                    ->orWhere('date_fin', '>=', now());
            })
            ->update([
                'date_fin' => now()
            ]);

        return $this->attributinService->create(array_merge($body, [
            'personne_id' => $personneId
        ]));
    }
}
