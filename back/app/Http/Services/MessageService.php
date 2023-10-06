<?php

namespace App\Http\Services;

use App\Models\Message;
use App\Models\Personne;
use Error;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class MessageService
{
    public function create(array $body)
    {
        return Message::create(array_merge($body, [
            'destinataires' => $this->computeDestinataires($body['critere'])
        ]));
    }

    private function computeDestinataires(array $critere): array
    {
        $mode = $critere['mode'];

        if (!isset($mode)) {
            throw new Error("Pas de mode");
        }

        $criteres = collect($critere['value'] ?? null);

        $query = Personne::select(['nom', 'prenom', 'email']);

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
            $query->whereHas('attributions', function (Builder $builder) use ($criteres) {
                if ($criteres->contains('fonction_id')) {
                    $builder->where('fonction_id', $criteres->get('fonction_id'));
                }
                if ($criteres->contains(['organisation_id', 'nature_id'])) {
                    $builder->whereHas('organisation', function ($subQuery) use ($criteres) {
                        if ($criteres->contains('organisation_id')) {
                            $subQuery->where('id', $criteres->get('organisation_id'));
                        }
                        if ($criteres->contains('nature_id')) {
                            $subQuery->where('nature_id', $criteres->get('nature_id'));
                        }
                    });
                }
                $builder->where('date_debut', '<=', now())
                    ->where(function ($subQuery) {
                        $subQuery->whereNull('date_fin')
                            ->orWhere('date_fin', '>=', now());
                    });
            });
        }
        return $query;
    }
}
