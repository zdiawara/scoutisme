<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class TypeOrganisation extends Model
{
    use UUID;

    protected $table = 'types_organisations';

    protected $fillable = [
        'code', 'nom',
    ];
}
