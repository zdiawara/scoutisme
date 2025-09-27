<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerificationController extends Controller
{
    public function verify(Request $request)
    {

        $user = User::find($request->route('id'));

        // 2. Vérification de la validité de l'utilisateur et du hachage
        if (!$user || ! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            // Lien invalide ou expiré
            return redirect(env('FRONTEND_URL') . '/verification-failed');
        }

        // 3. Marquer l'email comme vérifié
        if (!$user->hasVerifiedEmail()) {
            if ($user->markEmailAsVerified()) {
                event(new Verified($user));
                return redirect()->intended('/set-password');
            } else {
                return redirect()->intended('/error');
            }
        } else {
            if (!isset($user->password) || trim($user->password) === '') {
                Auth::login($user);
                return redirect()->intended('/set-password');
            } else {

                return redirect()->intended('/');
            }
        }
    }

    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Votre email est déjà vérifié.'], 200);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Un nouveau lien de vérification a été envoyé à votre adresse e-mail.']);
    }
}
