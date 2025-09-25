<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class LogActivityFilter extends ModelFilter
{

    public function search($search)
    {
        return $this->where(function ($q) use ($search) {
            return $q->where('nom', 'LIKE', "%$search%");
        });
    }
}
