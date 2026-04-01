<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleResource;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ModuleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Module::query()->with('sousModules.fonctionnalites.module');

        if ($request->has("noParentId")) {
            $query = $query->where('parent_id', null);
        }

        return [
            'data' => $query->get()
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $module = Module::create($request->all());

        Log::info('Module créé via API', [
            'module_id' => $module->id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Module $module)
    {
        $module->load('fonctionnalites.module');

        return new ModuleResource($module);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Module $module) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        $moduleId = $module->id;
        $module->delete();

        Log::info('Module supprimé via API', [
            'module_id' => $moduleId,
        ]);
    }
}
