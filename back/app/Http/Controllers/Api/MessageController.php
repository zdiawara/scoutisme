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

        if ($request->has('search')) {
            $query->where('titre', 'LIKE', "%" . $request->get('search') . "%");
        }

        $result = $this->addPaging($request, $query);

        $data = $result['query']
            //->orderBy('created_at', 'desc')
            ->get();


        return [
            'data' => MessageResource::collection($data),
            'meta' => $result['meta'],
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
