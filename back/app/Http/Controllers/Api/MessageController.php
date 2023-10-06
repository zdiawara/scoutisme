<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Http\Services\MailService;
use App\Http\Services\MessageService;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Message::query();

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
            'data' => MessageResource::collection($data),
            'total' => $total,
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, MessageService $messageService, MailService $mailService): Message
    {
        DB::beginTransaction();

        $message = $messageService->create($request->all());
        $mailService->send($message->titre, $message->content, $message->destinataires);

        DB::commit();

        return $message;
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return new MessageResource($message);
    }
}
