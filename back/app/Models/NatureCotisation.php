<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class NatureCotisation extends Model
{
    use UUID;

    protected $table = 'montants_cotisations';

    protected $fillable = ["type", "profil", "nature_id", "montant", "montants"];

    protected $casts = ['montants' => 'array'];
}
