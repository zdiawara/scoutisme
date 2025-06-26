<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class LogCsrf
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        Log::info('Checking auth:sanctum...');
        Log::info('Auth check result: ' . (Auth::check() ? 'true' : 'false'));
        if (Auth::check()) {
            Log::info('Authenticated user ID: ' . Auth::id());
            Log::info('Authenticated user email: ' . Auth::user()->email);
        } else {
            Log::warning('User NOT authenticated by Auth::check().');
        }

        // dd(Auth::check(), Auth::user()); // Décommenter pour inspection directe

        return $next($request);
    }
}
