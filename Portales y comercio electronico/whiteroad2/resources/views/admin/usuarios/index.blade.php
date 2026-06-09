@extends('layouts.admin')

@section('content')

<div class="admin-section">
    <div class="section-header">
        <h2>Usuarios</h2>
        <a href="{{ route('admin.usuarios.create') }}" class="btn btn-primary">+ Nuevo Usuario</a>
    </div>

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
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Reservas</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($usuarios as $usuario)
                <tr>
                    <td>{{ $usuario->id }}</td>
                    <td>{{ $usuario->name }}</td>
                    <td>{{ $usuario->email }}</td>
                    <td>{{ $usuario->telefono ?? 'N/A' }}</td>
                    <td>
                        <span class="badge {{ $usuario->role === 'admin' ? 'badge-info' : 'badge-secondary' }}">
                            {{ ucfirst($usuario->role) }}
                        </span>
                    </td>
                    <td>{{ $usuario->reservas_count }}</td>
                    <td>
                        <a href="{{ route('admin.usuarios.edit', $usuario) }}" class="btn btn-sm btn-secondary">Editar</a>
                        @if($usuario->id !== auth()->id())
                            <form action="{{ route('admin.usuarios.destroy', $usuario) }}" method="POST" style="display:inline; margin-left: 8px;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('¿Estás seguro? Esta acción no se puede deshacer.')">Eliminar</button>
                            </form>
                        @else
                            <span class="text-muted" style="margin-left: 8px;">No podés eliminarte</span>
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @if($usuarios->isEmpty())
        <p class="text-center text-muted">No hay usuarios registrados.</p>
    @endif
</div>

<style>
    .admin-section {
        padding: 20px;
    }

    .section-header {
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

    .badge-info {
        background-color: #17a2b8;
        color: white;
    }

    .badge-secondary {
        background-color: #6c757d;
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

    .btn-secondary {
        background-color: #6c757d;
        color: white;
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

    .text-center {
        text-align: center;
    }

    .text-muted {
        color: #999;
    }
</style>

@endsection
