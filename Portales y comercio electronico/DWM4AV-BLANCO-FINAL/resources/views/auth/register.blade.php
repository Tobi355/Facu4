@extends('layouts.app')

@section('title', 'Registro')

@section('content')
<div class="container">
    <div class="section-header">
        <h2>Crear <span>Cuenta</span></h2>
    </div>
    <div class="form-container">
        <form method="POST" action="{{ route('register') }}">
            @csrf
            <div class="form-group">
                <label for="name">Nombre completo</label>
                <input type="text" name="name" id="name" value="{{ old('name') }}" required>
                @error('name') <span class="form-error">{{ $message }}</span> @enderror
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="{{ old('email') }}" required>
                @error('email') <span class="form-error">{{ $message }}</span> @enderror
            </div>
            <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input type="text" name="telefono" id="telefono" value="{{ old('telefono') }}">
                @error('telefono') <span class="form-error">{{ $message }}</span> @enderror
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" required>
                @error('password') <span class="form-error">{{ $message }}</span> @enderror
            </div>
            <div class="form-group">
                <label for="password_confirmation">Confirmar contraseña</label>
                <input type="password" name="password_confirmation" id="password_confirmation" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Registrarme</button>
        </form>
        <p class="text-center mt-3">¿Ya tenés cuenta? <a href="{{ route('login') }}">Iniciá sesión</a></p>
    </div>
</div>
@endsection
