<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasUuids, Audit;

    protected $fillable = ['nom', 'code', 'perimetres'];

    protected $casts = ['perimetres' => 'array'];

    public function habilitations()
    {
        return $this->hasMany(Habilitation::class);
    }
}
