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
            'etat' => $this->etat,
            'adresse' => $this->adresse,
            'nature' => new NatureResource($this->whenLoaded('nature')),
            'type' => new TypeOrganisationResource($this->whenLoaded('type')),
            'parent' => new OrganisationResource($this->whenLoaded('parent')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
