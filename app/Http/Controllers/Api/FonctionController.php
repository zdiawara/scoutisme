<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FonctionResource;
use App\Http\Services\FonctionService;
use App\ModelFilters\FonctionFilter;
use App\Models\Fonction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        if ($request->has("sort")) {
            $parts = explode(",", $request->get('sort'));
            $query = $query->orderBy($parts[0], $parts[1] == 'asc' ? 'asc' : 'desc');
        }

        $result = $this->addPaging($request, $query);
        $data = $result['query']->with(['nature', 'type'])
            ->orderBy('nom', 'asc')
            ->get();
        return [
            "data" => FonctionResource::collection($data),
            "meta" => $result['meta']
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fonction = $this->fonctionService->create($request->all());

        Log::info('Fonction créée via API', [
            'fonction_id' => $fonction->id,
        ]);
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
        $fonction = $this->fonctionService->update($fonction, $request->except(['code']));

        Log::info('Fonction mise à jour via API', [
            'fonction_id' => $fonction->id,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fonction $fonction)
    {
        $fonctionId = $fonction->id;
        $fonction->delete();

        Log::info('Fonction supprimée via API', [
            'fonction_id' => $fonctionId,
        ]);
    }
}
