@extends('layouts.app')

@section('title', 'Iniciar Sesión')

@section('content')
<section class="auth-page login-page">
    <div class="container">
        <div class="section-header">
            <h2>Ingreso de <span>Usuario</span></h2>
            <p>Accedé con tu cuenta para reservar turnos y ver tu perfil.</p>
        </div>
        <div class="form-container">
        <form method="POST" action="{{ route('login.submit') }}">
            @csrf
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="{{ old('email') }}" required autofocus>
                @error('email')
                    <span class="form-error">{{ $message }}</span>
                @enderror
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" required>
                @error('password')
                    <span class="form-error">{{ $message }}</span>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
        </form>
        <p class="text-center mt-3">¿No tenés cuenta? <a href="{{ route('register') }}">Registrate</a></p>
        <p class="text-center mt-2">¿Sos administrador? <a href="{{ route('admin.login') }}">Ingresá aquí</a></p>
    </div>
    </div>
</section>
@endsection
