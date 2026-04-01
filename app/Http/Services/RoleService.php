<?php

namespace App\Http\Services;

use App\Models\Habilitation;
use App\Models\Role;
use Illuminate\Support\Facades\Log;

class RoleService
{
    public function create(array $body): Role
    {
        // Available alpha caracters
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // generate a pin based on 2 * 7 digits + a random character
        $pin = mt_rand(1000000, 9999999)
            . mt_rand(1000000, 9999999)
            . $characters[rand(0, strlen($characters) - 1)];

        // shuffle the result
        $string = str_shuffle($pin);
        $role = Role::create(array_merge($body, ['code' => $string]));

        collect($body['fonctionnalites'])
            ->each(function ($fonctionnaliteId) use ($role) {
                Habilitation::create([
                    'role_id' => $role->id,
                    'fonctionnalite_id' => $fonctionnaliteId
                ]);
            });

        Log::info('Rôle créé', [
            'role_id' => $role->id,
            'code' => $role->code,
            'nombre_fonctionnalites' => count($body['fonctionnalites'] ?? []),
        ]);

        return $role;
    }

    public function update(Role $role, array $body): Role
    {
        $role->update($body);

        $fonctionnalites = collect($body['fonctionnalites']);

        if ($fonctionnalites->isNotEmpty()) {
            Habilitation::where('role_id', $role->id)
                ->delete();
            $fonctionnalites->each(function ($fonctionnaliteId) use ($role) {
                Habilitation::create([
                    'role_id' => $role->id,
                    'fonctionnalite_id' => $fonctionnaliteId
                ]);
            });
        }

        Log::info('Rôle mis à jour', [
            'role_id' => $role->id,
            'nombre_fonctionnalites' => $fonctionnalites->count(),
        ]);


        return $role;
    }
}
