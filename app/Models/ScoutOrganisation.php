<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class ScoutOrganisation extends Model
{
    use UUID;

    protected $table = 'scout_organisations';

    protected $fillable = [
        'scout_id', 'organisation_id', 'role_id', 'date_debut', 'date_fin'
    ];
}
