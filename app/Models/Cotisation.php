<?php

namespace App\Models;

use App\Traits\Audit;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Cotisation extends Model
{
    use HasUuids, Filterable, SoftDeletes, Audit, LogsActivity;

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

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('cotisation')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Cotisation modifiée pour la personne " . $this->personne_id . " année " . $this->annee;
                }
                if ($eventName === "created") {
                    return "Cotisation créée pour la personne " . $this->personne_id . " année " . $this->annee;
                }
                if ($eventName === "deleted") {
                    return "Cotisation supprimée pour la personne " . $this->personne_id . " année " . $this->annee;
                }
                return "Cotisation {$eventName}";
            });
    }
}
