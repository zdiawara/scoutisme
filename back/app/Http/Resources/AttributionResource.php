<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttributionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'personne' => new PersonneResource($this->whenLoaded('personne')),
            'organisation' => new OrganisationResource($this->whenLoaded('organisation')),
            'fonction' => new FonctionResource($this->whenLoaded('fonction')),
            'date_debut' => $this->date_debut,
            'date_fin' => $this->date_fin,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
