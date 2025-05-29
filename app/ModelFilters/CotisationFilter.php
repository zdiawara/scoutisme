<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class CotisationFilter extends ModelFilter
{
    public function annee($value)
    {
        return $this->where('annee', $value);
    }

    public function personneId($value)
    {
        return $this->where('personne_id', $value);
    }
}
