<?php

use App\Http\Controllers\Api\FonctionController;
use App\Http\Controllers\Api\OrganisationController;
use App\Http\Controllers\Api\PersonneController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TypeOrganisationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('personnes', PersonneController::class);
Route::apiResource('organisations', OrganisationController::class);
Route::apiResource('fonctions', FonctionController::class);
Route::apiResource('types_organisations', TypeOrganisationController::class);
