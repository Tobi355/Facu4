<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminOrderController;



Route::get('/', [ServicioController::class, 'home'])->name('home');
Route::get('/servicios', [ServicioController::class, 'publicIndex'])->name('servicios.index');
Route::get('/servicios/{servicio}', [ServicioController::class, 'show'])->name('servicios.show');
Route::view('/nosotros', 'nosotros')->name('nosotros');
Route::view('/contacto', 'contacto')->name('contacto');
Route::post('/contacto', [ContactController::class, 'store'])->name('contacto.store');

Route::prefix('admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
        Route::resource('orders', AdminOrderController::class)
            ->only(['index','show']);
    });

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::get('/admin/login', [AuthController::class, 'showAdminLogin'])->name('admin.login');
    Route::post('/admin/login', [AuthController::class, 'login'])->name('admin.login.submit');
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    });
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

    Route::middleware('auth')->group(function () {
        Route::get('/perfil', [PerfilController::class, 'index'])->name('perfil.index');
        Route::put('/perfil', [PerfilController::class, 'update'])->name('perfil.update');
        Route::post('/reservas', [ReservaController::class, 'store'])->name('reservas.store');
        Route::delete('/reservas/{reserva}', [ReservaController::class, 'destroy'])->name('reservas.destroy');
        Route::get('/payment/success', [PaymentController::class,'success'])->name('payment.success');
        Route::get('/payment/pending', [PaymentController::class,'pending'])->name('payment.pending');
        Route::get('/payment/failure', [PaymentController::class,'failure'])->name('payment.failure');
        Route::get('/carrito', [CartController::class, 'index'])->name('cart.index');
        Route::post('/carrito/agregar/{servicio}', [CartController::class, 'add'])->name('cart.add');
        Route::post('/carrito/eliminar/{id}', [CartController::class, 'remove'])->name('cart.remove');
        Route::post('/carrito/vaciar', [CartController::class, 'clear'])->name('cart.clear');
        Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
        Route::post('/checkout/procesar', [CheckoutController::class, 'store'])->name('checkout.store');
        Route::get('/mis-compras', [OrderController::class,'index'])->name('orders.index');
        Route::get('/mis-compras/{order}', [OrderController::class,'show'])->name('orders.show');
        Route::get('/mis-compras', [OrderController::class, 'index'])->name('orders.index');
        Route::get('/mis-compras/{order}', [OrderController::class, 'show'])->name('orders.show');
        Route::get('/payment/success', [PaymentController::class,'success'])->name('payment.success');
        Route::get('/payment/pending', [PaymentController::class,'pending'])->name('payment.pending');
        Route::get('/payment/failure', [PaymentController::class,'failure'])->name('payment.failure');
    });
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::resource('servicios', ServicioController::class)->except(['show']);
    Route::resource('categorias', CategoriaController::class)->except(['show']);
    Route::get('usuarios', [AdminController::class, 'usuarios'])->name('usuarios');
    Route::get('usuarios/crear', [AdminController::class, 'createUsuario'])->name('usuarios.create');
    Route::post('usuarios', [AdminController::class, 'storeUsuario'])->name('usuarios.store');
    Route::get('usuarios/{user}/editar', [AdminController::class, 'editUsuario'])->name('usuarios.edit');
    Route::put('usuarios/{user}', [AdminController::class, 'updateUsuario'])->name('usuarios.update');
    Route::delete('usuarios/{user}', [AdminController::class, 'destroyUsuario'])->name('usuarios.destroy');
    Route::get('reservas', [AdminController::class, 'reservas'])->name('reservas');
    Route::patch('reservas/{reserva}/estado', [AdminController::class, 'cambiarEstadoReserva'])->name('reservas.estado');
    Route::get('contactos', [AdminController::class, 'contactos'])->name('contactos');
    Route::patch('contactos/{contactMessage}/estado', [AdminController::class, 'cambiarEstadoContacto'])->name('contactos.estado');
    Route::delete('contactos/{contactMessage}', [AdminController::class, 'destroyContacto'])->name('contactos.destroy');
    });
