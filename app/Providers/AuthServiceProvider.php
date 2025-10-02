<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // ...
        VerifyEmail::toMailUsing(function (object $notifiable, string $verificationUrl) {
            return (new MailMessage)
                ->subject(Lang::get('Bienvenue ! Veuillez vérifier votre adresse email')) // Sujet personnalisé
                ->greeting(Lang::get('Bonjour !'))
                ->line(Lang::get('Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse email.'))
                ->action(Lang::get('Vérifier mon Email'), $verificationUrl)
                ->line(Lang::get('Si vous n\'avez pas créé de compte, vous pouvez ignorer cet email.'));
        });


        // On dit à Laravel d’utiliser le frontend pour les liens de reset
        ResetPassword::createUrlUsing(function ($user, string $token) {
            return env("APP_URL")
                . '/reset-password?token=' . $token
                . '&email=' . urlencode($user->email);
        });
    }
}
