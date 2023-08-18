<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganisationResource extends JsonResource
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
            'nom' => $this->nom,
            'code' => $this->code,
            'etat' => (string)$this->etat,
            'adresse' => $this->adresse,
            'nature' => new NatureResource($this->whenLoaded('nature')),
            'type' => new TypeOrganisationResource($this->whenLoaded('type')),
            'parent' => new OrganisationResource($this->whenLoaded('parent')),
            'enfants' => OrganisationResource::collection($this->whenLoaded('enfants')),
            'ville' => new VilleResource($this->whenLoaded('ville')),
            'parents' => $this->parents,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
