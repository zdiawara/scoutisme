<?php

namespace App\Models;

use App\Traits\UUID;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paiement extends Model
{
    use UUID, Filterable, SoftDeletes;

    protected $fillable = [
        'cotisation_id', 'etat', 'montant', 'date_traitement', 'numero', 'commentaire'
    ];

    //protected $casts = ['paiements' => 'array'];

    public function cotisation()
    {
        return $this->belongsTo(Cotisation::class);
    }
}
