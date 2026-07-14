@extends('layouts.admin')

@section('title', 'Categorías - Admin')

@section('content')
<section class="admin-section container">
    <div class="section-header">
        <h2>Categorías</h2>
        <a href="{{ route('admin.categorias.create') }}" class="btn btn-primary">+ Nueva Categoría</a>
    </div>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="admin-table-container">
        <table class="admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($categorias as $categoria)
                <tr>
                    <td>{{ $categoria->id }}</td>
                    <td>{{ $categoria->nombre }}</td>
                    <td>{{ $categoria->descripcion ?? 'N/A' }}</td>
                    <td>
                        <span class="badge {{ $categoria->estado === 'activo' ? 'badge-success' : 'badge-danger' }}">
                            {{ ucfirst($categoria->estado) }}
                        </span>
                    </td>
                    <td>
                        <a href="{{ route('admin.categorias.edit', $categoria) }}" class="btn btn-sm btn-warning">Editar</a>
                        <form action="{{ route('admin.categorias.destroy', $categoria) }}" method="POST" class="inline-form">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('¿Estás seguro?')">Eliminar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
        </table>
    </div>
</section>
@endsection
