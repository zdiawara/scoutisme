<?php

namespace App\Http\Services;

use App\Models\Instance;

class InstanceService
{
    public function create(array $body)
    {
        return Instance::create($body);
    }

    public function update(Instance $instance, array $body)
    {
        $instance->update($body);
        return $instance;
    }
}
