<?php

namespace App\Http\Services;

use App\Models\Attribution;

class AttributionService
{

    public function create(array $body): Attribution
    {
        return Attribution::create($body);
    }

    public function update(Attribution $attribution, array $body)
    {
        $attribution->update($body);
        return $attribution;
    }
}
