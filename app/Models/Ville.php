<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Ville extends Model
{
    use HasUuids, LogsActivity;

    protected $fillable = ['nom', 'type'];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('ville')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Ville " . $this->nom . " modifiée";
                }
                if ($eventName === "created") {
                    return "Ville " . $this->nom .  " créée";
                }
                return "Ville {$eventName}";
            });
    }
}
