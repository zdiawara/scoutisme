<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Habilitation extends Model
{
    use UUID;

    protected $fillable = ['role_id', 'fonctionnalite_id'];

    public function fonctionnalite()
    {
        return $this->belongsTo(Fonctionnalite::class);
    }
}
