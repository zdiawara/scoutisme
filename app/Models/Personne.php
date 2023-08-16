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

    protected $fillable = ['nom', 'prenom', 'photo', 'code', 'adresse', 'email', 'telephones',  'profession', 'date_naissance', 'lieu_naissance', 'type'];

    protected $casts = ['adresse' => 'array'];

    public function modelFilter()
    {
        return $this->provideFilter(PersonneFilter::class);
    }
}
