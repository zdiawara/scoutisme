<?php

namespace App\Traits;

trait Audit
{
    protected static function boot()
    {
        parent::boot();

        static::updating(function ($model) {
            $model->modified_by = auth()->id;
        });

        static::creating(function ($model) {

            $model->created_by = auth()->id;
        });
    }
}
