<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Services\UserService;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth:api', ['except' => ['login']]);
    }

    public function register(Request $request)
    {

        $user = User::create(array_merge(
            $request->all(),
            ['password' => bcrypt('secret')]
        ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(UserService $userService)
    {
        $user = auth()->user();

        if (!isset($user)) {
            return response()->json([
                'message' => 'Utilisateur non connecté',
            ], 401);
        }
        $user['fonctionnalites'] = $userService->findFonctionnalites($user);
        $user->load(['role', 'personne.organisation.nature']);
        return new UserResource($user);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
