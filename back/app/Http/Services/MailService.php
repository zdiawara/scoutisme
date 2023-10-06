<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Mail;

class MailService
{
    public function send($titre, $content, array $destinataires)
    {
        Mail::html($content, function (\Illuminate\Mail\Message $messageBuilder) use ($destinataires, $titre) {

            $to = collect($destinataires)
                ->reduce(function ($result, $item) {
                    $result[$item['email']] = $item['nom'] . ' ' . $item['prenom'];
                    return $result;
                }, []);

            info("Envoi de mail aux destinataires", $to);
            $messageBuilder->from('no-reply@asbf.fr', 'Association des Scouts du Burkina')
                ->to($to)
                ->subject($titre);
        });
    }
}
