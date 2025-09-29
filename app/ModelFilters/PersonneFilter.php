<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;
use Illuminate\Support\Facades\DB;

class PersonneFilter extends ModelFilter
{
    //protected $blacklist = ['secretMethod'];

    public function search($search)
    {
        return $this->where(function ($q) use ($search) {

            return $q->where('personnes.nom', 'LIKE', "%$search%")
                ->orWhere('personnes.prenom', 'LIKE', "%$search%")
                ->orWhere('personnes.code', 'LIKE', "%$search%");
        });
    }

    public function etat($value)
    {
        return $this->where('personnes.etat', $value);
    }

    public function genreId($value)
    {
        return $this->where('personnes.genre_id', $value);
    }

    public function type($value)
    {
        return $this->where('personnes.type', $value);
    }

    public function villeId($value)
    {
        return $this->where('personnes.ville_id', $value);
    }

    public function fonctionId($value)
    {
        return $this->where('personnes.fonction_id', $value);
    }


    public function codeFonction($value)
    {
        return $this->join('fonctions', function ($q) {
            $q->on('fonctions.id', 'personnes.fonction_id');
        })->where('fonctions.code', $value);
    }


    public function etatCotisation($value)
    {
        return $this->join('cotisations', function ($q) {
            $q->on('personnes.id', 'cotisations.personne_id');
        })->where('cotisations.etat', $value)
            ->where('cotisations.annee', date('Y'));
    }

    public function niveauFormationId($value)
    {
        return $this->where(DB::raw("JSON_CONTAINS(JSON_EXTRACT(personnes.formations, '$[*].niveau_formation_id') , '\"" . $value . "\"')"), '=', 1);
    }
}
