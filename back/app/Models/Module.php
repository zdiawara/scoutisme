<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasUuids, Audit;

    protected $fillable = ["nom", "code", 'parent_id'];

    public function fonctionnalites()
    {
        return $this->hasMany(Fonctionnalite::class);
    }

    public function sousModules()
    {
        return $this->hasMany(Module::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Module::class, 'parent_id');
    }
}
