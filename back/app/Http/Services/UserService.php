<?php

namespace App\Http\Services;

use App\Models\Fonctionnalite;
use App\Models\Personne;
use App\Models\User;

class UserService
{
    public function create(array $body): User
    {
        $user = User::create(array_merge(
            $body,
            ['password' => bcrypt('secret')]
        ));

        return $user;
    }

    public function update(User $user, array $body): User
    {
        $user->update($body);
        return $user;
    }

    public function findFonctionnalites(User $user)
    {
        return Fonctionnalite::query()
            ->with('module.parent')
            ->join('habilitations as h', function ($builder) {
                $builder->on('h.fonctionnalite_id', 'fonctionnalites.id');
            })
            ->where('h.role_id', $user->role_id)
            ->get();
    }

    public function createFromPersonne(Personne $personne, array $body)
    {
        return $this->create([
            'name' => $personne->nom . ' ' . $personne->prenom,
            'email' => $body['email'],
            'role_id' => $body['role_id'],
            'personne_id' => $personne->id
        ]);
    }
}
