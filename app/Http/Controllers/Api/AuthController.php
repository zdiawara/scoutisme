<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Services\UserService;
use App\Models\Personne;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

    public function authLogin()
    {
        return redirect()->intended('/');
    }

    public function register(Request $request)
    {

        DB::beginTransaction();
        $inputs = $request->validate([
            'code' => ['required'],
            'password' => ['required']
        ]);

        $code = $inputs['code'];

        $message = $this->checkCode($code);

        if (isset($message)) {
            return response()->json(['errors' => ['message' => [$message]]], 422);
        }

        $personne = Personne::where('code', $code)
            ->first();

        $user = User::create([
            'password' => bcrypt($inputs['password']),
            'name' => $personne->prenom . ' ' . $personne->nom,
            'email' => $personne->email,
            'personne_id' => $personne->id
        ]);

        // Déclencher l'événement Registered pour envoyer l'e-mail de vérification
        event(new Registered($user));

        Auth::login($user);

        DB::commit();

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
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::where('email', $request->input('email'))
                ->first();
            Auth::login($user);
            $request->session()->regenerate();
            return redirect()->intended('/');
        }
        return response()->json(['message' => 'Vos identifiants sont incorrects'], 400);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(UserService $userService)
    {
        $user =  Auth::user();

        if (!isset($user)) {
            return response()->json([
                'message' => 'Utilisateur non connecté',
            ], 401);
        }

        $userService->addFonctionnalitesAndRoles($user);

        $user->load([
            'personne.fonction',
            'personne.organisation.nature',
            'personne.organisation.type'
        ]);

        return new UserResource($user);
    }

    private function checkCode($code)
    {
        $personne = Personne::where('code', $code)
            ->first();

        if (!isset($personne)) {
            return 'Aucune personne associée au code ' . $code;
        }

        $user = User::where('personne_id', $personne->id)
            ->first();

        if (isset($user)) {
            return 'Cet utilisateur possède déjà un compte';
        }

        return null;
    }

    public function verifierCode(Request $request)
    {
        $inputs = $request->validate([
            'code' => ['required'],
        ]);

        $code = $inputs['code'];

        $message = $this->checkCode($code);

        if (isset($message)) {
            return response()->json([
                'errors' => ['message' => [$message]]
            ], 422);
        }

        $personne = Personne::where('code', $code)
            ->first();

        return [
            'data' => [
                'code' => $personne->code,
                'email' => $this->maskEmail($personne->email)
            ]
        ];
    }

    function maskEmail($email)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $parts = explode('@', $email);
            $username = $parts[0];
            $domain = $parts[1];

            $maskedUsername = '';
            if (strlen($username) > 2) {
                $maskedUsername = str_repeat('*', strlen($username) - 2) . substr($username, -2);
            } else {
                $maskedUsername = str_repeat('*', strlen($username)); // Masque tout si trop court
            }

            return $maskedUsername . '@' . $domain;
        }
        return $email; // Retourne l'email original si invalide
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
            'hash' => [
                'required',
                'uuid'
            ]
        ]);

        $hash = $request->input('hash');

        $user = User::where('reset_password_hash', $hash)
            ->whereNotNull('reset_password_hash')
            ->firstOrFail();

        $user->forceFill([
            'password' => Hash::make($request->password),
            'reset_password_hash' => null
        ])->save();

        Auth::login($user);

        return response()->json(['message' => 'Successfully logged out']);
    }
}
