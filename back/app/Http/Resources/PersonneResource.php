<?php

namespace App\Http\Resources;

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
        return collect(parent::toArray($request))->except(['ville_id', 'niveau_formation_id', 'genre_id', 'fonction_id', 'organisation_id'])
            ->merge([
                'ville' => new VilleResource($this->whenLoaded('ville')),
                'niveau_formation' => new RefFormationResource($this->whenLoaded('niveauFormation')),
                'etat' => (string)$this->etat,
                'genre' => new GenreResource($this->whenLoaded('genre')),
                'organisation' => new OrganisationResource($this->whenLoaded('organisation')),
                'fonction' => new FonctionResource($this->whenLoaded('fonction'))
            ])->all();
    }
}
