<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasUuids;

    protected $fillable = ['nom'];
}
