<?php

namespace App\Http\Services;

use App\Exceptions\BadRequestException;
use App\Models\Fonctionnalite;
use App\Models\Personne;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function create(array $body): User
    {
        DB::beginTransaction();

        $user = User::create($body);

        DB::commit();

        Log::info('Utilisateur créé', [
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        return $user;
    }

    public function update(User $user, array $body): User
    {
        $user->update($body);

        Log::info('Utilisateur mis à jour', [
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

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

    public function findFonctionnalites($user)
    {
        if (!isset($user->personne)) {
            return [];
        } else {
            $fonctionId = $user->personne->fonction_id;
            $roleIds = Role::where(DB::raw("JSON_CONTAINS(fonctions , '\"" . $fonctionId . "\"')"), '=', 1)
                ->get()
                ->map(function ($role) {
                    return $role['id'];
                })->toArray();

            return Fonctionnalite::query()
                ->with('module.parent')
                ->join('habilitations as habilitation', function ($builder) {
                    $builder->on('habilitation.fonctionnalite_id', 'fonctionnalites.id');
                })
                ->whereIn('habilitation.role_id', $roleIds)
                ->get();
        }
    }

    public function createFromPersonne(Personne $personne)
    {
        DB::beginTransaction();

        $nbUser = User::where('personne_id', $personne->id)
            ->count();

        if ($nbUser >= 1) {
            Log::warning('Création de compte refusée: compte déjà existant pour la personne', [
                'personne_id' => $personne->id,
            ]);
            throw new BadRequestException($personne->nom . " " . $personne->prenom . " possède déjà un compte");
        }

        $user =  $this->create([
            'name' => $personne->nom . ' ' . $personne->prenom,
            'email' => $personne->email,
            'personne_id' => $personne->id
        ]);

        $this->addFonctionnalitesAndRoles($user);

        // Déclencher l'événement Registered pour envoyer l'e-mail de vérification
        event(new Registered($user));

        // Auth::login($user);

        DB::commit();

        Log::info('Compte utilisateur créé à partir d\'une personne', [
            'user_id' => $user->id,
            'personne_id' => $personne->id,
        ]);

        return $user;
    }

    public function findByPersonneId(string $personneId): User | null
    {
        return User::where('personne_id', $personneId)
            ->first();
    }
}
