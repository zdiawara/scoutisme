<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Services\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query()
            ->orderBy('name', 'asc');

        return [
            "data" => UserResource::collection($query->get()
                ->each(function ($user) {
                    $this->userService->addFonctionnalitesAndRoles($user);
                })),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $this->userService->create($request->all());
        $this->userService->addFonctionnalitesAndRoles($user);

        Log::info('Utilisateur créé via API', [
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load(['personne.fonction', 'personne.organisation.nature']);
        $this->userService->addFonctionnalitesAndRoles($user);
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, Request $request)
    {
        $user = $this->userService->update($user, $request->all());
        $this->userService->addFonctionnalitesAndRoles($user);

        Log::info('Utilisateur mis à jour via API', [
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        return new UserResource($user);
    }
}
