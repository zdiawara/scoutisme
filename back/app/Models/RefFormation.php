<?php

namespace App\Models;

use App\Traits\Audit;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefFormation extends Model
{
    use HasUuids, SoftDeletes, Audit;

    protected $table = 'ref_formations';

    protected $fillable = ['nom', 'code'];
}
