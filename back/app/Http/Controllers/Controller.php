<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function addPaging(Request $request, $query)
    {
        $_query  = $query;
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
            'query' => $_query,
            'meta' => $meta
        ];
    }

    protected function pdfResponse($output, $filename)
    {
        return response()->make($output, Response::HTTP_OK, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename=' . $filename . '',
        ]);
    }
}
