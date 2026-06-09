@extends('layouts.admin')

@section('content')

<div class="admin-section">
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
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <table class="table table-striped">
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

    @if($servicios->isEmpty())
        <p class="text-center text-muted">No hay servicios registrados.</p>
    @endif
</div>

<style>
    .admin-section {
        padding: 20px;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .table th,
    .table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    .table th {
        background-color: #f5f5f5;
        font-weight: bold;
    }

    .table tr:hover {
        background-color: #f9f9f9;
    }

    .badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
    }

    .badge-success {
        background-color: #28a745;
        color: white;
    }

    .badge-danger {
        background-color: #dc3545;
        color: white;
    }

    .badge-info {
        background-color: #17a2b8;
        color: white;
    }

    .btn {
        padding: 6px 12px;
        border-radius: 4px;
        text-decoration: none;
        cursor: pointer;
        border: none;
        font-size: 14px;
    }

    .btn-primary {
        background-color: #007bff;
        color: white;
    }

    .btn-warning {
        background-color: #ffc107;
        color: black;
    }

    .btn-danger {
        background-color: #dc3545;
        color: white;
    }

    .btn-sm {
        padding: 4px 8px;
        font-size: 12px;
    }

    .alert {
        padding: 12px;
        margin-bottom: 20px;
        border-radius: 4px;
    }

    .alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .alert-danger {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .text-center {
        text-align: center;
    }

    .text-muted {
        color: #999;
    }
</style>

@endsection
