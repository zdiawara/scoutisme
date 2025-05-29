<?php

namespace App\Traits;

trait Audit
{
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if (Auth()->user() != null) {
                if (isset($model->id)) {
                    $model->modified_by = Auth()->user()->id;
                } else {
                    $model->created_by = Auth()->user()->id;
                }
            }
        });
    }
}
