<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Attribution extends Model
{
    use UUID;

    protected $fillable = [
        'personne_id', 'organisation_id', 'fonction_id', 'date_debut', 'date_fin'
    ];
}
