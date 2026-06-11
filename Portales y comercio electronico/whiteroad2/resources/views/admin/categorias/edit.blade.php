@extends('layouts.admin')

@section('content')

<div class="admin-section">
    <div class="section-header">
        <h2>Editar Categoría: {{ $categoria->nombre }}</h2>
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

    <form action="{{ route('admin.categorias.update', $categoria) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="nombre">Nombre *</label>
            <input type="text" id="nombre" name="nombre" class="form-control" value="{{ old('nombre', $categoria->nombre) }}" required>
        </div>

        <div class="form-group">
            <label for="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" class="form-control" rows="4">{{ old('descripcion', $categoria->descripcion) }}</textarea>
        </div>

        <div class="form-group">
            <label>
                <input type="checkbox" id="estado" name="estado" value="activo" {{ old('estado', $categoria->estado) === 'activo' ? 'checked' : '' }}>
                Activa
            </label>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            <a href="{{ route('admin.categorias.index') }}" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
</div>

<style>
    .admin-section {
        padding: 20px;

    }

    .section-header {
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
    }

    .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
    }

    .form-control:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 30px;
    }

    .btn {
        padding: 10px 20px;
        border-radius: 4px;
        text-decoration: none;
        cursor: pointer;
        border: none;
        font-size: 14px;
        font-weight: bold;
    }

    .btn-primary {
        background-color: #007bff;
        color: white;
    }

    .btn-primary:hover {
        background-color: #0056b3;
    }

    .btn-secondary {
        background-color: #6c757d;
        color: white;
    }

    .btn-secondary:hover {
        background-color: #545b62;
    }

    .alert {
        padding: 12px;
        margin-bottom: 20px;
        border-radius: 4px;
    }

    .alert-danger {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .alert-danger ul {
        margin: 0;
        padding-left: 20px;
    }

    .alert-danger li {
        margin: 5px 0;
    }
</style>

@endsection
