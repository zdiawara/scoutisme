<?php

use App\Http\Controllers\Api\AttributionController;
use App\Http\Controllers\Api\CotisationController;
use App\Http\Controllers\Api\FonctionController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\InstanceController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NatureController;
use App\Http\Controllers\Api\OrganisationController;
use App\Http\Controllers\Api\OrganisationStatController;
use App\Http\Controllers\Api\PaiementController;
use App\Http\Controllers\Api\PersonneController;
use App\Http\Controllers\Api\RefFormationController;
use App\Http\Controllers\Api\ScoutStatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TypeOrganisationController;
use App\Http\Controllers\Api\VilleController;

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

Route::get('/personnes/{personneId}/attributions', [PersonneController::class, 'readAttribiutions']);
Route::post('/personnes/{personneId}/affecter', [PersonneController::class, 'affecter']);
Route::post('/personnes/{personneId}/cotiser', [PersonneController::class, 'cotiser']);
Route::get('/personnes/exports/csv', [PersonneController::class, 'exportPersonnes']);
Route::get('/personnes_sans_fonction', [PersonneController::class, 'readPersonnesSansFonction']);

Route::apiResource('organisations', OrganisationController::class);
Route::get('/organisations/{organisationId}/direction', [OrganisationController::class, 'readDirection']);
Route::apiResource('fonctions', FonctionController::class);
Route::apiResource('type_organisations', TypeOrganisationController::class);
Route::apiResource('natures', NatureController::class);
Route::apiResource('villes', VilleController::class);
Route::apiResource('ref_formations', RefFormationController::class, []);
Route::apiResource('fonctions', FonctionController::class);
Route::apiResource('attributions', AttributionController::class);
Route::apiResource('genres', GenreController::class);
Route::apiResource('messages',  MessageController::class);
Route::apiResource('instances',  InstanceController::class);
Route::apiResource('cotisations',  CotisationController::class);
Route::apiResource('paiements',  PaiementController::class);
Route::put('/paiements/{paiement}/valider', [PaiementController::class, 'valider']);
Route::put('/paiements/{paiement}/rejeter', [PaiementController::class, 'rejeter']);

Route::get('/stats/organisations/regions', [OrganisationStatController::class, 'statByRegion']);
Route::get('/stats/organisations', [OrganisationStatController::class, 'countAll']);
Route::get('/stats/scouts/regions', [ScoutStatController::class, 'statByRegion']);
Route::get('/stats/scouts/genre', [ScoutStatController::class, 'scoutByGenre']);
