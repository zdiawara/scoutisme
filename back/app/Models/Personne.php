<?php

namespace App\Models;

use App\ModelFilters\PersonneFilter;
use EloquentFilter\Filterable;
use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Personne extends Model
{
    use UUID, HasFactory, Filterable;

    protected $fillable = [
        'nom', 'prenom', 'photo', 'code', 'adresse', 'email', 'telephone', 'etat', 'personne_a_contacter',
        'profession', 'date_naissance', 'lieu_naissance', 'type', 'genre_id', 'ville_id', 'niveau_formation_id',
        'organisation_id', 'fonction_id', 'date_fin', 'date_debut'
    ];

    protected $casts = ['personne_a_contacter' => 'array'];

    public function niveauFormation()
    {
        return $this->belongsTo(RefFormation::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

    public function fonction()
    {
        return $this->belongsTo(Fonction::class);
    }

    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function attributions(): HasMany
    {
        return $this->hasMany(Attribution::class);
    }

    public function modelFilter()
    {
        return $this->provideFilter(PersonneFilter::class);
    }
}
