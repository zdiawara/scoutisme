<?php

namespace App\Models;

use App\ModelFilters\PersonneFilter;
use EloquentFilter\Filterable;
use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personne extends Model
{
    use UUID, HasFactory, Filterable;

    protected $fillable = [
        'nom', 'prenom', 'photo', 'code', 'adresse', 'email', 'telephone', 'etat', 'personne_a_contacter',
        'profession', 'date_naissance', 'lieu_naissance', 'type', 'ville_id', 'niveau_formation_id'
    ];

    protected $casts = ['personne_a_contacter' => 'array'];

    public function niveauFormation()
    {
        return $this->belongsTo(RefFormation::class);
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function modelFilter()
    {
        return $this->provideFilter(PersonneFilter::class);
    }
}
