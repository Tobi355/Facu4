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

@endsection
