<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Fonction extends Model
{
    use UUID;

    protected $fillable = [
        'code', 'nom'
    ];
}
