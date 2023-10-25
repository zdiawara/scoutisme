<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeOrganisation extends Model
{
    use UUID, SoftDeletes;

    protected $table = 'types_organisations';

    protected $fillable = [
        'code', 'nom', 'position', 'membre'
    ];
}
