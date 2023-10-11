<?php

namespace App\Http\Services;

use App\Exceptions\BadRequestException;
use App\Models\Message;
use App\Models\Personne;
use Error;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MessageService
{
    public function create(array $body)
    {
        $destinataires = collect($this->computeDestinataires($body['critere']));
        if ($destinataires->isEmpty()) {
            throw new BadRequestException("Pas de destinataires trouvés");
        }
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
        DB::enableQueryLog();
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
        dd($query->get()->toArray());
        dd(DB::getQueryLog());
        return $query;
    }
}