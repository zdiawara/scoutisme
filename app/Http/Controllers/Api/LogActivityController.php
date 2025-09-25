<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InstanceResource;
use App\Http\Resources\LogResource;
use App\Http\Services\InstanceService;
use App\Models\Instance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\Models\Activity;

class LogActivityController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Activity::with(['causer', 'subject'])
            ->when($request->search, fn($q) => $q->where(function ($q) use ($request) {
                return $q->where('log_name', 'LIKE', "%$request->search%")
                    ->orWhere('description', 'LIKE', "%$request->search%");
            }))
            ->latest();

        $result = $this->addPaging($request, $query);

        $data = $result['query']
            ->get();

        return [
            'data' => LogResource::collection($data),
            "meta" => $result['meta']
        ];
    }


    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        $activity->load('causer');
        return new LogResource($activity);
    }
}
