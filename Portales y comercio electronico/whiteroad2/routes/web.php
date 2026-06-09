<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\ContactController;

// Rutas públicas
Route::get('/', [ServicioController::class, 'home'])->name('home');
Route::get('/servicios', [ServicioController::class, 'publicIndex'])->name('servicios.index');
Route::get('/servicios/{servicio}', [ServicioController::class, 'show'])->name('servicios.show');
Route::view('/nosotros', 'nosotros')->name('nosotros');
Route::view('/contacto', 'contacto')->name('contacto');
Route::post('/contacto', [ContactController::class, 'store'])->name('contacto.store');

// Autenticación
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Usuarios autenticados
Route::middleware('auth')->group(function () {
    Route::get('/perfil', [PerfilController::class, 'index'])->name('perfil.index');
    Route::put('/perfil', [PerfilController::class, 'update'])->name('perfil.update');
    // Reservas
    Route::post('/reservas', [ReservaController::class, 'store'])->name('reservas.store');
    Route::delete('/reservas/{reserva}', [ReservaController::class, 'destroy'])->name('reservas.destroy');
});

// Administración (solo admin)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::resource('servicios', ServicioController::class)->except(['show']);
    Route::resource('categorias', CategoriaController::class)->except(['show']);
    Route::get('usuarios', [AdminController::class, 'usuarios'])->name('usuarios');
    Route::delete('usuarios/{user}', [AdminController::class, 'destroyUsuario'])->name('usuarios.destroy');
    Route::get('reservas', [AdminController::class, 'reservas'])->name('reservas');
    Route::patch('reservas/{reserva}/estado', [AdminController::class, 'cambiarEstadoReserva'])->name('reservas.estado');
    // Contactos
    Route::get('contactos', [AdminController::class, 'contactos'])->name('contactos');
    Route::patch('contactos/{contactMessage}/estado', [AdminController::class, 'cambiarEstadoContacto'])->name('contactos.estado');
    Route::delete('contactos/{contactMessage}', [AdminController::class, 'destroyContacto'])->name('contactos.destroy');
});
