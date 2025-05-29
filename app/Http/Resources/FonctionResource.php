<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FonctionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return collect(parent::toArray($request))->except(['nature_id', 'type_id'])
            ->merge([
                'nature' => new NatureResource($this->whenLoaded('nature')),
                'type' => new TypeOrganisationResource($this->whenLoaded('type')),
            ])->all();
    }
}
