<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\VerificationController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group([
    // 'middleware' => 'api',
    // 'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('/auth/login', [AuthController::class, 'authLogin'])->name('login');
    Route::post('verifier-code', [AuthController::class, 'verifierCode']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('logout', [AuthController::class, 'logout']);
    // Route::post('refresh', [AuthController::class, 'refresh']);

});

// Auth::routes(['verify' => true]);

// Route::get('/login', [LoginController::class, 'login'])->name('login');

// Routes de vérification d'e-mail
Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])
    // ->middleware(['signed', 'auth'])
    ->name('verification.verify'); // Important pour la génération de l'URL

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/email/resend', [VerificationController::class, 'resend'])
        ->middleware(['throttle:6,1'])
        ->name('verification.send'); // Important pour la génération de l'URL
});

Route::view('/{path?}', "welcome")->where("path", ".*");

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
