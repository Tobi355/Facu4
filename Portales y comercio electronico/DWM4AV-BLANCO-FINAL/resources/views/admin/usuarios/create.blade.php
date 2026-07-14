@extends('layouts.admin')

@section('content')

<div class="admin-section">
    <div class="section-header">
        <h2>Nuevo Usuario</h2>
    </div>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('admin.usuarios.store') }}" method="POST">
        @csrf

        <div class="form-group">
            <label for="name">Nombre *</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ old('name') }}" required>
        </div>

        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" class="form-control" value="{{ old('email') }}" required>
        </div>

        <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input type="text" id="telefono" name="telefono" class="form-control" value="{{ old('telefono') }}">
        </div>

        <div class="form-group">
            <label for="role">Rol *</label>
            <select id="role" name="role" class="form-control" required>
                <option value="user" {{ old('role') === 'user' ? 'selected' : '' }}>Usuario</option>
                <option value="admin" {{ old('role') === 'admin' ? 'selected' : '' }}>Administrador</option>
            </select>
        </div>

        <div class="form-group">
            <label for="password">Contraseña *</label>
            <input type="password" id="password" name="password" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="password_confirmation">Confirmar contraseña *</label>
            <input type="password" id="password_confirmation" name="password_confirmation" class="form-control" required>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Crear Usuario</button>
            <a href="{{ route('admin.usuarios') }}" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
</div>

@endsection
