<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Services\UserService;
use App\Models\Fonction;
use App\Models\Fonctionnalite;
use App\Models\User;
use Illuminate\Http\Request;

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
            ->with('role')
            ->orderBy('name', 'asc');

        return [
            "data" => UserResource::collection($query->get()),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $this->userService->create($request->all());
        $user->load(['role']);
        $user['fonctionnalites'] = $this->userService->findFonctionnalites($user);
        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, Request $request)
    {
        $user = $this->userService->update($user, $request->all());
        $user->load(['role']);
        $user['fonctionnalites'] = $this->userService->findFonctionnalites($user);
        return new UserResource($user);
    }
}
