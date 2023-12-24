<?php

namespace App\Models;

use App\Traits\Audit;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Instance extends Model
{
    use HasUuids, Filterable, SoftDeletes, Audit;

    protected $fillable = [
        'nom', 'compositions'
    ];

    protected $casts = ['compositions' => 'array'];
}
