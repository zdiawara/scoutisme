<?php

namespace App\Models;

use App\Traits\UUID;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Instance extends Model
{
    use UUID, Filterable;

    protected $fillable = [
        'nom', 'composition'
    ];

    protected $casts = ['composition' => 'array'];
}
