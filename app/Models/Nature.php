<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Nature extends Model
{
    use HasUuids, Audit;

    protected $fillable = [
        'code', 'nom'
    ];
}
