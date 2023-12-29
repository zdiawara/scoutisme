<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Fonctionnalite extends Model
{
    use HasUuids, Audit;

    protected $fillable = ["nom", "code", "module_id", 'description'];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
