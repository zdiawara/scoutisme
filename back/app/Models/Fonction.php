<?php

namespace App\Models;

use App\ModelFilters\FonctionFilter;
use App\Traits\UUID;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fonction extends Model
{
    use UUID, Filterable, SoftDeletes;

    protected $fillable = [
        'code', 'nom', 'nature_id', 'duree_mandat', 'type_id'
    ];

    public function modelFilter()
    {
        return $this->provideFilter(FonctionFilter::class);
    }

    public function nature()
    {
        return $this->belongsTo(Nature::class);
    }

    public function type()
    {
        return $this->belongsTo(TypeOrganisation::class);
    }
}
