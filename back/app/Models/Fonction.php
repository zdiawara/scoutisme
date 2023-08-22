<?php

namespace App\Models;

use App\ModelFilters\FonctionFilter;
use App\Traits\UUID;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;

class Fonction extends Model
{
    use UUID, Filterable;

    protected $fillable = [
        'code', 'nom', 'nature_id'
    ];

    public function modelFilter()
    {
        return $this->provideFilter(FonctionFilter::class);
    }
}
