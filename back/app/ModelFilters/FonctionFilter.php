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

    public function code($value)
    {
        return $this->where('code', $value);
    }

    public function codeExclude($value)
    {
        return $this->whereNotIn('code', explode(";", $value));
    }

    public function codeNature($value)
    {
        return $this->whereHas('nature', function ($q) use ($value) {
            $q->whereIn('code', explode(";", $value));
        });
    }
}
