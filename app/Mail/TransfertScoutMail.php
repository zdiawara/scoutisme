<?php

namespace App\Mail;

use App\Models\Transfert;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class TransfertScoutMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Transfert $transfert)
    {
        $nom = $transfert->scout->prenom . ' ' . $transfert->scout->nom;

        $frontendUrl = config('app.url') . '/transferts/' . $transfert->id . '/confirmer';

        // Ajouter la signature pour la sécurité côté backend
        $backendUrl = URL::signedRoute('transfert.confirmer', ['transfert' => $transfert->id]);

        // Concaténer signature au frontend
        $confirmationUrl = $frontendUrl . '?' .  parse_url($backendUrl, PHP_URL_QUERY);

        $this->data = [
            'subject' => 'Demande de transfert scout - ' . $nom,
            'nomScout' => $nom,
            'numeroScout' => $transfert->scout->code,
            'uniteDepart' => $transfert->uniteDepart->nom,
            'uniteArrivee' => $transfert->uniteArrivee->nom,
            'confirmationUrl' => $confirmationUrl,
        ];
    }

    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
            ->subject($this->data['subject'])
            ->markdown('emails.transfert-scout');
    }
}
