<?php

namespace App\Models;

use App\ModelFilters\OrganisationFilter;
use App\Traits\Audit;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Organisation extends Model
{
    use HasUuids, Filterable, Audit, LogsActivity;

    protected $fillable = ['nom', 'code', 'adresse', 'nature_id', 'ville_id', 'type_id', 'parent_id', 'etat'];

    protected $casts = ['parents' => 'array'];

    public function type()
    {
        return $this->belongsTo(TypeOrganisation::class);
    }

    public function nature()
    {
        return $this->belongsTo(Nature::class);
    }

    public function parent()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function enfants()
    {
        return $this->hasMany(Organisation::class, 'parent_id');
    }

    public function modelFilter()
    {
        return $this->provideFilter(OrganisationFilter::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('organisation')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Organisation " . $this->nom . " (" . $this->code . ") modifiée";
                }
                if ($eventName === "created") {
                    return "Organisation " . $this->nom . " (" . $this->code . ") créée";
                }
                if ($eventName === "deleted") {
                    return "Organisation " . $this->nom . " (" . $this->code . ") supprimée";
                }
                return "Organisation {$eventName}";
            });
    }
}
