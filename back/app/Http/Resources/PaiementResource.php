<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaiementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return collect(parent::toArray($request))->except(['cotisation_id'])
            ->merge([
                'cotisation' => new CotisationResource($this->whenLoaded('cotisation')),
            ])->all();
    }
}
