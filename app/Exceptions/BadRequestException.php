<?php

namespace App\Exceptions;

use Exception;

class BadRequestException extends Exception
{
    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage() ?: 'Requête invalide.'
        ], 400);
    }
}
