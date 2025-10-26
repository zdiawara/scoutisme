<?php

namespace App\Models;

use App\ModelFilters\FonctionFilter;
use App\Traits\Audit;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Fonction extends Model
{
    use HasUuids, Filterable, SoftDeletes, Audit, LogsActivity;

    protected $fillable = [
        'code',
        'nom',
        'nature_id',
        'duree_mandat',
        'type_id',
        'responsable',
        'categorie'
    ];

    public function modelFilter()
    {
        return $this->provideFilter(FonctionFilter::class);
    }

    public function nature()
    {
        return $this->belongsTo(Nature::class);
    }

    public function type()
    {
        return $this->belongsTo(TypeOrganisation::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('fonction')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Fonction " . $this->nom . " (" . $this->code . ") modifiée";
                }
                if ($eventName === "created") {
                    return "Fonction " . $this->nom . " (" . $this->code . ") créée";
                }
                if ($eventName === "deleted") {
                    return "Fonction " . $this->nom . " (" . $this->code . ") supprimée";
                }
                return "Fonction {$eventName}";
            });
    }
}
