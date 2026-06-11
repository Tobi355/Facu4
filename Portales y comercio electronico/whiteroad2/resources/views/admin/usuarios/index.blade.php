@extends('layouts.admin')

@section('title', 'Usuarios - Admin')

@section('content')
<section class="admin-section container">
    <div class="section-header">
        <h2>Usuarios</h2>
        <a href="{{ route('admin.usuarios.create') }}" class="btn btn-primary">+ Nuevo Usuario</a>
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
    </div>
</section>
@endsection
