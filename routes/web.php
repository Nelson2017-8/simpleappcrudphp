<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/query_user', function () {
    return view('welcome');
});
Route::get('/update_user', function () {
    return view('welcome');
});


// GRUPO DE ROUTE
Route::prefix('user')->group(function (){
    Route::post('/create', [UserController::class, 'create'])->name('user.create');
    Route::post('/find', [UserController::class, 'find'])->name('user.find');
    Route::post('/query', [UserController::class, 'query'])->name('user.query');
    Route::post('/delete', [UserController::class, 'delete'])->name('user.delete');
    Route::post('/update', [UserController::class, 'update'])->name('user.update');
});
