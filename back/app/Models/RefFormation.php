<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class RefFormation extends Model
{
    use UUID;

    protected $table = 'ref_formations';

    protected $fillable = ['nom', 'code'];
}
