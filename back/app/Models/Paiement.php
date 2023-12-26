<?php

namespace App\Models;

use App\Traits\Audit;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paiement extends Model
{
    use HasUuids, Filterable, SoftDeletes, Audit;

    protected $fillable = [
        'cotisation_id', 'etat', 'montant', 'date_traitement', 'numero', 'commentaire', 'valideur_id'
    ];

    public function cotisation()
    {
        return $this->belongsTo(Cotisation::class);
    }

    public function valideur(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function createur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
