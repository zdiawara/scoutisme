<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify(EmailVerificationRequest $request)
    {

        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Votre email est déjà vérifié.'], 200);
        }

        $request->fulfill();
        event(new Verified($request->user()));
        return redirect()->intended('/');
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
