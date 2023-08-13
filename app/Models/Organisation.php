<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    use UUID;

    protected $fillable = ['nom', 'code', 'adresse', 'nature_id', 'type_id', 'parent_id', 'etat'];

    public function type()
    {
        return $this->belongsTo(TypeOrganisation::class);
    }

    public function nature()
    {
        return $this->belongsTo(Nature::class);
    }
}
