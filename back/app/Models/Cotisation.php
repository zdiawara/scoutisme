<?php

namespace App\Models;

use App\Traits\UUID;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cotisation extends Model
{
    use UUID, Filterable, SoftDeletes;

    protected $fillable = [
        'annee', 'montant_total', 'personne_id', 'montant_paye', 'montant_restant'
    ];

    public function personne()
    {
        return $this->belongsTo(Personne::class);
    }
}
