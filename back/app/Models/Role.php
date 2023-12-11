<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use UUID;

    protected $fillable = ['nom', 'code', 'perimetres'];

    protected $casts = ['perimetres' => 'array'];

    public function habilitations()
    {
        return $this->hasMany(Habilitation::class);
    }
}
