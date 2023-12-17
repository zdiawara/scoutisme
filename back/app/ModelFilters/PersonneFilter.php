<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class PersonneFilter extends ModelFilter
{
    //protected $blacklist = ['secretMethod'];

    public function search($search)
    {
        return $this->where(function ($q) use ($search) {
            return $q->where('nom', 'LIKE', "%$search%")
                ->orWhere('prenom', 'LIKE', "%$search%");
        });
    }

    public function etat($value)
    {
        return $this->where('etat', $value);
    }

    public function genreId($value)
    {
        return $this->where('genre_id', $value);
    }

    public function type($value)
    {
        return $this->where('personnes.type', $value);
    }

    public function villeId($value)
    {
        return $this->where('ville_id', $value);
    }

    public function fonctionId($value)
    {
        return $this->where('fonction_id', $value);
    }


    public function codeFonction($value)
    {
        return $this->join('fonctions', function ($q) {
            $q->on('fonctions.id', 'personnes.fonction_id');
        })->where('fonctions.code', $value);
    }

    public function niveauFormationId($value)
    {
        return $this->where('niveau_formation_id', $value);
    }

    public function pasFonction($value)
    {
        return $this->leftJoin('attributions', function ($q) {
            $q->on('attributions.personne_id', 'personnes.id');
        })->whereNull('attributions.id');
    }
}
