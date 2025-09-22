<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'roles' => $this->roles,
            'verify' => isset($this->email_verified_at),
            'personne' =>  new PersonneResource($this->whenLoaded('personne')),
            'fonctionnalites' => isset($this->fonctionnalites) ? FonctionnaliteResource::collection($this->fonctionnalites) : null,
            'created_at' => date('Y-m-d H:i:s', strtotime($this->created_at)),
            'updated_at' => isset($this->updated_at) ? date('Y-m-d H:i:s', strtotime($this->created_at)) : null,
        ];
    }
}
