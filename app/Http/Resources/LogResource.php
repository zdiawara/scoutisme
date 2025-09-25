<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogResource extends JsonResource
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
                'created_at' => date('Y-m-d H:i:s', strtotime($this->created_at)),
                'updated_at' => date('Y-m-d H:i:s', strtotime($this->updated_at))
            ])->toArray();
    }
}
