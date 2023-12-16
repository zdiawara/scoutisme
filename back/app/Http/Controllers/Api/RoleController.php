<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Http\Services\RoleService;
use App\Models\Habilitation;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    private $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Role::query();

        return [
            'data' =>  RoleResource::collection($query->with('habilitations.fonctionnalite')->orderBy('nom', 'asc')
                ->get())
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->roleService->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return new RoleResource($role);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $this->roleService->update($role, $request->except(['code']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateFonctionnalites(Request $request, Role $role)
    {
        DB::beginTransaction();
        Habilitation::where('role_id', $role->id)
            ->delete();

        collect($request->get('fonctionnalites'))
            ->each(function ($fonctionnaliteId) use ($role) {
                Habilitation::create([
                    'role_id' => $role->id,
                    'fonctionnalite_id' => $fonctionnaliteId
                ]);
            });
        DB::commit();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
    }
}
