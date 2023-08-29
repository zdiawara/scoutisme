<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Genre;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            "data" => Genre::query()
                ->orderBy('nom', 'asc')
                ->get()
        ];
    }
}
