<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefFormation extends Model
{
    use UUID, SoftDeletes;

    protected $table = 'ref_formations';

    protected $fillable = ['nom', 'code'];
}
