<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class OrganisationFilter extends ModelFilter
{
    public function search($search)
    {
        return $this->where(function ($q) use ($search) {
            return $q->where('nom', 'LIKE', "%$search%")
                ->orWhere('code', 'LIKE', "%$search%");
        });
    }

    public function etat($value)
    {
        return $this->where('etat', $value);
    }
}
