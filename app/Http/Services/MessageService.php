<?php

namespace App\Http\Services;

use App\Exceptions\BadRequestException;
use App\Models\Message;
use App\Models\Personne;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class MessageService
{
    public function create(array $body)
    {
        if (collect($body['destinataires'] ?? null)->isEmpty()) {
            Log::warning('Création de message refusée: aucun destinataire', []);
            throw new BadRequestException("Pas de destinataires trouvés");
        }

        $message = Message::create($body);

        Log::info('Message créé', [
            'message_id' => $message->id,
            'nombre_destinataires' => count($message->destinataires ?? []),
        ]);

        return $message;
    }

    public function createFromCriteres(array $body)
    {
        $destinataires = collect($this->computeDestinataires($body['critere']));
        $message = $this->create(array_merge($body, [
            'destinataires' => $destinataires
        ]));

        Log::info('Message créé à partir de critères', [
            'message_id' => $message->id,
            'nombre_destinataires' => $destinataires->count(),
        ]);

        return $message;
    }

    private function computeDestinataires(array $critere): array
    {
        $mode = $critere['mode'];

        if (!isset($mode)) {
            throw new BadRequestException("Pas de mode");
        }

        $criteres = collect($critere['value'] ?? null);

        $query = Personne::select(['personnes.nom', 'personnes.prenom', 'personnes.email']);

        switch ($mode) {
            case 'personne':
                $query = $this->filterByPersonne($criteres, $query);
                break;
            case 'profil':
                $query = $this->filterByProfil($criteres, $query);
                break;
            default:
                break;
        }

        return $query->whereNotNull('email')
            ->get()
            ->toArray();
    }

    private function filterByPersonne(Collection $criteres, Builder $query)
    {
        if ($criteres->has('type')) {
            $query->where('type', $criteres->get('type'));
        }
        return $query;
    }

    private function filterByProfil(Collection $criteres, Builder $query)
    {
        if ($criteres->hasAny('organisation_id', 'nature_id', 'fonction_id')) {

            $query->join('attributions as a', function ($builder) {
                $builder->on('a.personne_id', 'personnes.id');
            });


            if ($criteres->has('fonction_id')) {
                $query->where('a.fonction_id', $criteres->get('fonction_id'));
            }

            if ($criteres->hasAny(['organisation_id', 'nature_id'])) {

                $query->join('organisations as o', function ($builder) {
                    $builder->on('o.id', 'a.organisation_id');
                });

                if ($criteres->has('organisation_id')) {
                    $query->where('o.id', $criteres->get('organisation_id'));
                }
                if ($criteres->has('nature_id')) {
                    $query->where('o.nature_id', $criteres->get('nature_id'));
                }
            }
        }
        return $query;
    }
}
