<?php

namespace App\Models;

use App\ModelFilters\AttributionFilter;
use App\Traits\UUID;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Attribution extends Model
{
    use UUID, Filterable;

    protected $fillable = [
        'personne_id', 'organisation_id', 'fonction_id', 'date_debut', 'date_fin', 'type'
    ];

    public function personne()
    {
        return $this->belongsTo(Personne::class);
    }

    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function fonction()
    {
        return $this->belongsTo(Fonction::class)->withTrashed();
    }

    public function modelFilter()
    {
        return $this->provideFilter(AttributionFilter::class);
    }
}
