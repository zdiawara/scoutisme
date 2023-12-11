<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use UUID;

    protected $fillable = ["nom", "code"];

    public function fonctionnalites()
    {
        return $this->hasMany(Fonctionnalite::class);
    }
}
