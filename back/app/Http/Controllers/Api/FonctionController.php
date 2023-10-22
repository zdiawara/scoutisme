<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\FonctionService;
use App\ModelFilters\FonctionFilter;
use App\Models\Fonction;
use Illuminate\Http\Request;

class FonctionController extends Controller
{

    private $fonctionService;

    public function __construct(FonctionService $fonctionService)
    {
        $this->fonctionService = $fonctionService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Fonction::filter($request->all(), FonctionFilter::class);

        $meta = [];

        if ($request->has('page')) {
            $size = $request->get('size', 10);
            $page = $request->get('page', 1);
            $total = $query->count();
            $query = $query->offset(($page - 1) * $size)
                ->limit($size);
            $meta = [
                'size' => $size,
                'page' => $page,
                'total' => $total,
                'total_page' => ceil($total / $size)
            ];
        }

        return [
            "data" => $query->with(['nature'])
                ->orderBy('nom', 'asc')
                ->get(),
            "meta" => $meta
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->fonctionService->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Fonction $fonction)
    {
        return response()->json($fonction);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fonction $fonction)
    {
        $this->fonctionService->update($fonction, $request->except(['code']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fonction $fonction)
    {
        //
    }
}
