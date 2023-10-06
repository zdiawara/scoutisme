<?php

namespace App\Models;

use App\Traits\UUID;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use UUID, Filterable;

    protected $fillable = [
        'titre', 'content', 'destinataires', 'critere'
    ];

    protected $casts = ['destinataires' => 'array', 'critere' => 'array'];
}
