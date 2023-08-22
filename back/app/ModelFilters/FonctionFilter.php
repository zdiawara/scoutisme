<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class FonctionFilter extends ModelFilter
{
    public function nature($value)
    {
        return $this->where(function ($q) use ($value) {
            return $q->where('nature_id', $value)
                ->orWhereNull('nature_id');
        });
    }
}
