<?php

namespace App\Models;

use App\ModelFilters\AttributionFilter;
use DateTimeInterface;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Attribution extends Model
{
    use HasUuids, Filterable;

    protected $fillable = [
        'personne_id', 'organisation_id', 'fonction_id', 'date_debut', 'date_fin'
    ];

    protected $casts = [
        'date_debut' => 'date:Y',
        'date_fin' => 'date:Y'
    ];

    protected $dates = ['date_debut', 'date_fin'];

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


    public function serializeDate(DateTimeInterface $date)
    {
        dd("in");
        return $date->format('c');
    }
}
