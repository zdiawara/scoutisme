<?php

namespace App\Models;

use App\Traits\UUID;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Instance extends Model
{
    use UUID, Filterable, SoftDeletes;

    protected $fillable = [
        'nom', 'compositions'
    ];

    protected $casts = ['compositions' => 'array'];
}
