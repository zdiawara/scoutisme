<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class MontantCotisation extends Model
{
    use HasUuids, Audit, LogsActivity;

    protected $table = 'montants_cotisations';

    protected $fillable = ["type", "profil", "nature_id", "montant", "montants"];

    protected $casts = ['montants' => 'array'];


    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('montants_cotisations')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Montant cotisation " . $this->type . " " . $this->profil . " modifié";
                }
                if ($eventName === "created") {
                    return "Montant cotisation " .  $this->type . " " . $this->profil . " créé";
                }
                return "Montant cotisation {$eventName}";
            });
    }
}
