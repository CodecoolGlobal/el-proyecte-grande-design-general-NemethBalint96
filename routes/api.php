<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
});
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/suggestions', function (Illuminate\Http\Request $request) {
    $suggestionsFile = storage_path('app/public/ingredients.json');
    $suggestionsJson = file_get_contents($suggestionsFile);
    $suggestionsData = json_decode($suggestionsJson);

    $query = $request->query('q');
    $suggestions = [];
    foreach ($suggestionsData as $suggestion) {
        if (str_starts_with(strtolower($suggestion->name), strtolower($query))) {
            $suggestions[] = $suggestion;
        }
    }

    return response()->json($suggestions);
});
