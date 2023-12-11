<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Fonctionnalite extends Model
{
    use UUID;

    protected $fillable = ["nom", "code", "module_id"];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
