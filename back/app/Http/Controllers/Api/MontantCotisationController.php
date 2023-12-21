<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MontantCotisation;
use Illuminate\Http\Request;

class MontantCotisationController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = MontantCotisation::query();

        $result = $this->addPaging($request, $query);

        $data = $result['query']
            ->orderBy('type', 'asc')
            ->get();

        return [
            'data' => $data,
            'meta' => $result['meta'],
        ];
    }
}
