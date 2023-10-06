<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return collect(parent::toArray($request))->except([])
            ->merge([
                'created_at' => date('d/m/Y H:i', strtotime($this->created_at))
            ])->all();
    }
}
