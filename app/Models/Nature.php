<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Nature extends Model
{
    use HasUuids, Audit, LogsActivity;

    protected $fillable = [
        'code',
        'nom'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('nature')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Nature " . $this->nom . " (" . $this->code . ") modifiée";
                }
                if ($eventName === "created") {
                    return "Nature " . $this->nom . " (" . $this->code . ") créée";
                }
                if ($eventName === "deleted") {
                    return "Nature " . $this->nom . " (" . $this->code . ") supprimée";
                }
                return "Nature {$eventName}";
            });
    }
}
