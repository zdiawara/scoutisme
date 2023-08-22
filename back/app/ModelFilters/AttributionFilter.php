<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class AttributionFilter extends ModelFilter
{
    public function organisationId($value)
    {
        return $this->where('organisation_id', $value);
    }
}
