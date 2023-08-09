<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use UUID;

    protected $fillable = [
        'code', 'nom', 'type_organisation_id'
    ];
}
