<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\ArticleController;

Route::get('/', [HomeController::class, 'index']);
// productos
Route::resource('productos', ProductosController::class);
// articulos
Route::resource('articulos', ArticleController::class);
