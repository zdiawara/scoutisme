<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InstanceResource;
use App\Http\Services\InstanceService;
use App\Models\Instance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InstanceController extends Controller
{

    private InstanceService $instanceService;

    public function __construct(InstanceService $instanceService)
    {
        $this->instanceService = $instanceService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Instance::query();

        $total = $query->count();
        $data = collect([]);

        if ($total > 0) {
            $page = $request->get('page', 1);
            $size = $request->get('size', 100);
            $data = $query
                ->offset(($page - 1) * $size)
                ->limit($size)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return [
            'data' => InstanceResource::collection($data),
            'total' => $total,
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        $instance = $this->instanceService->create($request->all());
        DB::commit();
        return new InstanceResource($instance);
    }

    /**
     * Display the specified resource.
     */
    public function show(Instance $instance)
    {
        return new InstanceResource($instance);
    }
}
