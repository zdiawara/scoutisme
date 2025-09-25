<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Role extends Model
{
    use HasUuids, Audit, LogsActivity;

    protected $fillable = ['nom', 'code', 'perimetres', 'fonctions'];

    protected $casts = ['perimetres' => 'array', 'fonctions' => 'array'];

    public function habilitations()
    {
        return $this->hasMany(Habilitation::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('role')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Rôle " . $this->nom . " (" . $this->code . ") modifié";
                }
                if ($eventName === "created") {
                    return "Rôle " . $this->nom . " (" . $this->code . ") créé";
                }
                return "Rôle {$eventName}";
            });
    }
}
