<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class TypeOrganisation extends Model
{
    use HasUuids, SoftDeletes, LogsActivity;

    protected $table = 'types_organisations';

    protected $fillable = [
        'code',
        'nom',
        'position',
        'membre',
        'nature_id'
    ];

    public function nature()
    {
        return $this->belongsTo(Nature::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('typeOrganisation')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Type d'organisation " . $this->nom . " (" . $this->code . ") modifié";
                }
                if ($eventName === "created") {
                    return "Type d'organisation " . $this->nom . " (" . $this->code . ") créé";
                }
                return "Type d'organisation {$eventName}";
            });
    }
}
