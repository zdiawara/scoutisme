<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HabilitationResource extends JsonResource
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
            'role' =>  new RoleResource($this->whenLoaded('role')),
            'fonctionnalite' =>  new FonctionnaliteResource($this->whenLoaded('fonctionnalite')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
