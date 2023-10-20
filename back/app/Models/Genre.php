<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use UUID;

    protected $fillable = ['nom', 'code'];
}
