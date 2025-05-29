<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class MontantCotisation extends Model
{
    use HasUuids, Audit;

    protected $table = 'montants_cotisations';

    protected $fillable = ["type", "profil", "nature_id", "montant", "montants"];

    protected $casts = ['montants' => 'array'];
}
