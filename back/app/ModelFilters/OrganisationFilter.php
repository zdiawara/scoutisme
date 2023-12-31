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

    public function codeNature($value)
    {
        return $this->whereHas('nature', function ($q) use ($value) {
            $q->whereIn('code', explode(";", $value));
        });
    }

    public function natureId($value)
    {
        return $this->where('nature_id', $value);
    }

    public function typeId($value)
    {
        return $this->where('type_id', $value);
    }

    public function parentId($value)
    {
        return $this->where('parent_id', $value);
    }
}
