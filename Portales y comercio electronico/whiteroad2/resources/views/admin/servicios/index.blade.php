@extends('layouts.admin')

@section('title', 'Servicios - Admin')

@section('content')

<section class="admin-section container">
    <div class="section-header">
        <h2>Servicios</h2>
        <a href="{{ route('admin.servicios.create') }}" class="btn btn-primary">+ Nuevo Servicio</a>
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

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="admin-table-container">
        <table class="admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Duración</th>
                <th>Activo</th>
                <th>Destacado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($servicios as $servicio)
                <tr>
                    <td>{{ $servicio->id }}</td>
                    <td>{{ $servicio->nombre }}</td>
                    <td>{{ $servicio->categoria->nombre ?? 'N/A' }}</td>
                    <td>${{ number_format($servicio->precio, 0, ',', '.') }}</td>
                    <td>{{ $servicio->duracion }}</td>
                    <td>
                        <span class="badge {{ $servicio->activo ? 'badge-success' : 'badge-danger' }}">
                            {{ $servicio->activo ? 'Sí' : 'No' }}
                        </span>
                    </td>
                    <td>
                        <span class="badge {{ $servicio->destacado ? 'badge-info' : '' }}">
                            {{ $servicio->destacado ? 'Sí' : 'No' }}
                        </span>
                    </td>
                    <td>
                        <a href="{{ route('admin.servicios.edit', $servicio) }}" class="btn btn-sm btn-warning">Editar</a>
                        <form action="{{ route('admin.servicios.destroy', $servicio) }}" method="POST" style="display:inline;">
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
