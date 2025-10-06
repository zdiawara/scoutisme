<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Transfert extends Model
{
    use HasUuids, HasFactory,  Audit, LogsActivity;

    protected $fillable = [
        'id',
        'numero',
        'unite_depart_id',
        'unite_arrivee_id',
        'scout_id',
        'etat',
        'created_by',
        'modified_by',
    ];

    public function scout()
    {
        return $this->belongsTo(Personne::class);
    }

    public function uniteArrivee()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function uniteDepart()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('transfert')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Transfert " . $this->numero . " modifié";
                }
                if ($eventName === "created") {
                    return "Transfert " . $this->numero .  " créé";
                }
                return "Transfert {$eventName}";
            });
    }
}
