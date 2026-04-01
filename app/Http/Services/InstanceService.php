<?php

namespace App\Http\Services;

use App\Models\Instance;
use Illuminate\Support\Facades\Log;

class InstanceService
{
    public function create(array $body)
    {
        $instance = Instance::create($body);

        Log::info('Instance créée', [
            'instance_id' => $instance->id,
        ]);

        return $instance;
    }

    public function update(Instance $instance, array $body)
    {
        $instance->update($body);

        Log::info('Instance mise à jour', [
            'instance_id' => $instance->id,
        ]);

        return $instance;
    }
}
