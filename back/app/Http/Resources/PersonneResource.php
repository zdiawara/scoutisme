<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonneResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $attribution = [];

        if ($this->hasAttributionActive()) {
            $attribution = [
                'date_debut' => $this->date_debut,
                'date_fin' => $this->date_fin,
                'organisation' =>   new OrganisationResource($this->whenLoaded('organisation')),
                'fonction' =>   new FonctionResource($this->whenLoaded('fonction'))
            ];
        }

        $response = collect(parent::toArray($request))->except(['ville_id', 'niveau_formation_id', 'genre_id', 'fonction_id', 'organisation_id', 'date_debut', 'date_fin'])
            ->merge([
                'nom' => strtoupper($this->nom),
                'ville' => new VilleResource($this->whenLoaded('ville')),
                'niveau_formation' => new RefFormationResource($this->whenLoaded('niveauFormation')),
                'etat' => (string)$this->etat,
                'genre' => new GenreResource($this->whenLoaded('genre')),
            ])
            ->merge($attribution);

        return $response->all();
    }

    private function hasAttributionActive()
    {
        if ($this->date_debut == null) {
            return false;
        }
        $date_debut = Carbon::createFromFormat('Y-m-d H:i:s', $this->date_debut);
        $date_fin = $this->date_fin == null ? null : Carbon::createFromFormat('Y-m-d H:i:s', $this->date_fin);
        $now = Carbon::now();
        if ($date_fin == null) {
            return $date_debut->lte($now);
        }
        return $date_debut->lte($now) && $date_fin->gte($now);
    }
}
