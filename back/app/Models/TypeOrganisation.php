<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeOrganisation extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'types_organisations';

    protected $fillable = [
        'code', 'nom', 'position', 'membre', 'nature_id'
    ];

    public function nature()
    {
        return $this->belongsTo(Nature::class);
    }
}
