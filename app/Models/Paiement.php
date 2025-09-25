<?php

namespace App\Models;

use App\Traits\Audit;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Paiement extends Model
{
    use HasUuids, Filterable, SoftDeletes, Audit, LogsActivity;

    protected $fillable = [
        'cotisation_id',
        'etat',
        'montant',
        'recu',
        'date_traitement',
        'numero',
        'commentaire',
        'valideur_id'
    ];

    protected $casts = ['recu' => 'array'];

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

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('paiement')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Paiement " . $this->numero . " modifié";
                }
                if ($eventName === "created") {
                    return "Paiement " . $this->numero . " créé";
                }
                if ($eventName === "deleted") {
                    return "Paiement " . $this->numero . " supprimé";
                }
                return "Paiement {$eventName}";
            });
    }
}
