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
        return $this->where('type', $value);
    }


    /*public function onlyShowDeletedForAdmins()
    {
        if (Auth::user()->isAdmin()) {
            $this->withTrashed();
        }
    }*/
}
