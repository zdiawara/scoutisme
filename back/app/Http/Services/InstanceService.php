<?php

namespace App\Http\Services;

use App\Models\Instance;

class InstanceService
{
    public function create(array $body)
    {
        return Instance::create($body);
    }
}
