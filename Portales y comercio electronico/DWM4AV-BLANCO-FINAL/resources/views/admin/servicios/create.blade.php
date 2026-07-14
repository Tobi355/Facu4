@extends('layouts.admin')

@section('content')

<div class="admin-section">
    <div class="section-header">
        <h2>Nuevo Servicio</h2>
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

    <form action="{{ route('admin.servicios.store') }}" method="POST">
        @csrf

        <div class="form-group">
            <label for="nombre">Nombre *</label>
            <input type="text" id="nombre" name="nombre" class="form-control" value="{{ old('nombre') }}" required>
        </div>

        <div class="form-group">
            <label for="descripcion">Descripción *</label>
            <textarea id="descripcion" name="descripcion" class="form-control" rows="4" required>{{ old('descripcion') }}</textarea>
        </div>

        <div class="form-group">
            <label for="precio">Precio *</label>
            <input type="number" id="precio" name="precio" class="form-control" step="0.01" min="0" value="{{ old('precio') }}" required>
        </div>

        <div class="form-group">
            <label for="duracion">Duración *</label>
            <input type="text" id="duracion" name="duracion" class="form-control" value="{{ old('duracion') }}" placeholder="Ej: 30 minutos" required>
        </div>

        <div class="form-group">
            <label for="condiciones">Condiciones</label>
            <textarea id="condiciones" name="condiciones" class="form-control" rows="3">{{ old('condiciones') }}</textarea>
        </div>

        <div class="form-group">
            <label for="categoria_id">Categoría *</label>
            <select id="categoria_id" name="categoria_id" class="form-control" required>
                <option value="">Seleccionar categoría...</option>
                @foreach($categorias as $categoria)
                    <option value="{{ $categoria->id }}" {{ old('categoria_id') == $categoria->id ? 'selected' : '' }}>
                        {{ $categoria->nombre }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label for="imagen">Imagen</label>
            <input type="text" id="imagen" name="imagen" class="form-control" value="{{ old('imagen') }}" placeholder="URL o nombre de archivo">
        </div>

        <div class="form-group">
            <label>
                <input type="checkbox" id="destacado" name="destacado" value="1" {{ old('destacado') ? 'checked' : '' }}>
                Destacado
            </label>
        </div>

        <div class="form-group">
            <label>
                <input type="checkbox" id="activo" name="activo" value="1" checked {{ old('activo') ? 'checked' : '' }}>
                Activo
            </label>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Crear Servicio</button>
            <a href="{{ route('admin.servicios.index') }}" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
</div>

@endsection
