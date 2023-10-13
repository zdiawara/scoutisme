<?php

namespace App\Models;

use App\ModelFilters\OrganisationFilter;
use App\Traits\UUID;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    use UUID, Filterable;

    protected $fillable = ['nom', 'code', 'adresse', 'nature_id', 'ville_id', 'type_id', 'parent_id', 'etat'];

    protected $casts = ['parents' => 'array'];

    public function type()
    {
        return $this->belongsTo(TypeOrganisation::class);
    }

    public function nature()
    {
        return $this->belongsTo(Nature::class);
    }

    public function parent()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function enfants()
    {
        return $this->hasMany(Organisation::class, 'parent_id');
    }

    public function modelFilter()
    {
        return $this->provideFilter(OrganisationFilter::class);
    }
}
