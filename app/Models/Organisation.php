<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    use UUID;

    protected $fillable = ['nom', 'code', 'adresse', 'type_organisation_id', 'parent_id', 'etat'];
}
