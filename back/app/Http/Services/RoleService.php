<?php

namespace App\Http\Services;

use App\Models\Role;

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
        return Role::create(array_merge($body, ['code' => $string]));
    }

    public function update(Role $role, array $body): Role
    {
        $role->update($body);
        return $role;
    }
}
