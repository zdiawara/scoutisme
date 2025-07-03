<?php

namespace App\Models;

use App\Traits\Audit;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cotisation extends Model
{
    use HasUuids, Filterable, SoftDeletes, Audit;

    protected $fillable = [
        'annee',
        'etat',
        'montant_total',
        'personne_id',
        'montant_paye',
        'montant_restant'
    ];

    public function personne()
    {
        return $this->belongsTo(Personne::class);
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }
}
