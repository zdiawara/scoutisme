<?php

namespace App\Http\Services;

use App\Mail\CreerUserMail;
use App\Models\Fonctionnalite;
use App\Models\Personne;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class UserService
{
    public function create(array $body): User
    {
        DB::beginTransaction();
        $user = User::create(array_merge(
            $body,
            ['password' => bcrypt('secret')]
        ));

        Mail::to('zakaridia.diawara@gmail.com')
            ->send(new CreerUserMail($user));

        DB::commit();

        return $user;
    }

    public function update(User $user, array $body): User
    {
        $user->update($body);
        return $user;
    }

    public function addFonctionnalitesAndRoles($user)
    {
        if (!isset($user->personne)) {
            $user['roles'] = Role::where('code', 'admin')
                ->get();
            $user['fonctionnalites'] = [];
        } else {

            $fonctionId = $user->personne->fonction_id;

            $user['roles'] = Role::where(DB::raw("JSON_CONTAINS(fonctions , '\"" . $fonctionId . "\"')"), '=', 1)
                ->get()
                ->toArray();

            $roleIds = Role::where(DB::raw("JSON_CONTAINS(fonctions , '\"" . $fonctionId . "\"')"), '=', 1)
                ->get()
                ->map(function ($role) {
                    return $role['id'];
                })->toArray();

            $user['fonctionnalites'] = Fonctionnalite::query()
                ->with('module.parent')
                ->join('habilitations as habilitation', function ($builder) {
                    $builder->on('habilitation.fonctionnalite_id', 'fonctionnalites.id');
                })
                ->whereIn('habilitation.role_id', $roleIds)
                ->get();
        }
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
