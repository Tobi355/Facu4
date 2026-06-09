@extends('layouts.app')

@section('title', 'Iniciar Sesión')

@section('content')
<div class="container">
    <div class="section-header">
        <h2>Iniciar <span>Sesión</span></h2>
    </div>
    <div class="form-container">
        <form method="POST" action="{{ route('login') }}">
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
            <div class="form-group">
                <label>
                    <input type="checkbox" name="remember"> Recordarme
                </label>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
        </form>
        <p class="text-center mt-3">¿No tenés cuenta? <a href="{{ route('register') }}">Registrate</a></p>
    </div>
</div>
@endsection
