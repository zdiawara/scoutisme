<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class RefFormation extends Model
{
    use HasUuids, SoftDeletes, Audit, LogsActivity;

    protected $table = 'ref_formations';

    protected $fillable = ['nom', 'code'];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('refFormation')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Référentiel formation " . $this->nom . " (" . $this->code . ") modifié";
                }
                if ($eventName === "created") {
                    return "Référentiel formation " . $this->nom . " (" . $this->code . ") créé";
                }
                return "Référentiel formation {$eventName}";
            });
    }
}
