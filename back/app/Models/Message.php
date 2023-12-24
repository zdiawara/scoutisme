<?php

namespace App\Models;

use App\Traits\Audit;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasUuids, Filterable, Audit;

    protected $fillable = [
        'objet', 'contenu', 'destinataires', 'critere'
    ];

    protected $casts = ['destinataires' => 'array', 'critere' => 'array'];
}
