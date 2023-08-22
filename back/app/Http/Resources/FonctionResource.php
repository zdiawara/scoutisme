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

        return collect(parent::toArray($request))->except(['nature'])
            ->merge([
                'nature' => new NatureResource($this->whenLoaded('nature')),
            ])->all();
    }
}
