<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Habilitation extends Model
{
    use HasUuids, Audit;

    protected $fillable = ['role_id', 'fonctionnalite_id'];

    public function fonctionnalite()
    {
        return $this->belongsTo(Fonctionnalite::class);
    }
}
