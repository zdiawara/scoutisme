<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Nature extends Model
{
    use UUID;

    protected $fillable = [
        'code', 'nom'
    ];
}
