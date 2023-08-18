<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PersonneResource;
use App\Http\Services\PersonneService;
use App\ModelFilters\PersonneFilter;
use App\Models\Personne;
use Illuminate\Http\Request;

class PersonneController extends Controller
{
    private $personneService;

    public function __construct(PersonneService $personneService)
    {
        $this->personneService = $personneService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Personne::filter($request->all(), PersonneFilter::class);

        $total = $query->count();
        $data = collect([]);

        if ($total > 0) {
            $page = $request->get('page', 1);
            $size = $request->get('size', 10);
            $data = $query
                ->offset(($page - 1) * $size)
                ->limit($size)
                ->orderBy('nom', 'asc')
                ->with(['ville'])
                ->get();
        }

        return [
            'data' => PersonneResource::collection($data),
            'total' => $total,
        ];


        return $this->personneService->readPersonnes($request->all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $personne = $this->personneService->create($request->all());
        return new PersonneResource($personne);
    }

    /**
     * Display the specified resource.
     */
    public function show(Personne $personne)
    {
        $personne->load(['ville', 'niveauFormation']);
        return new PersonneResource($personne);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Personne $personne)
    {
        $personne = $this->personneService->update($personne, $request->all());
        return $personne;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Personne $personne)
    {
        //
    }
}
