<?php

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class AttributionFilter extends ModelFilter
{
    public function organisationId($value)
    {
        return $this->where('organisation_id', $value);
    }
    public function personneId($value)
    {
        return $this->where('personne_id', $value);
    }
    public function type($value)
    {
        return $this->where('type', $value);
    }
    public function fonctionCode($value)
    {
        return $this->whereHas('fonction', function ($q) use ($value) {
            $q->where('code', $value);
        });
    }
    public function actif($value)
    {

        if ($value == 'true') {
            return $this->where('date_debut', '<=', now())
                ->where(function ($q) {
                    $q->whereNull('date_fin')
                        ->orWhere('date_fin', '>=', now());
                });
        }
    }
}
