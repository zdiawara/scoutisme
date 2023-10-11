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

    public function type($value)
    {
        return $this->where('personnes.type', $value);
    }

    public function villeId($value)
    {
        return $this->where('ville_id', $value);
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
