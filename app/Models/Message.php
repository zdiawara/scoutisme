<?php

namespace App\Models;

use App\Traits\Audit;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Message extends Model
{
    use HasUuids, Filterable, Audit, LogsActivity;

    protected $fillable = [
        'objet',
        'contenu',
        'destinataires',
        'critere'
    ];

    protected $casts = ['destinataires' => 'array', 'critere' => 'array'];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('message')
            ->setDescriptionForEvent(function (string $eventName) {
                if ($eventName === "updated") {
                    return "Message " . $this->objet . " modifié";
                }
                if ($eventName === "created") {
                    return "Message " . $this->objet . " crée";
                }
                return "Message {$eventName}";
            });
    }
}
