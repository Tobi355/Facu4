@extends('layouts.admin')

@section('title', 'Mensajes de Contacto - Admin')

@section('content')
<section class="admin-section container">
    <div class="section-header">
        <h2>Mensajes recibidos</h2>
    </div>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    @if (session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <div class="admin-table-container">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Asunto</th>
                    <th>Mensaje</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($contactos as $contacto)
                    <tr>
                        <td>{{ $contacto->id }}</td>
                        <td>
                            {{ $contacto->nombre }}
                            @if ($contacto->telefono)
                                <br><small style="color: var(--text-muted);">{{ $contacto->telefono }}</small>
                            @endif
                        </td>
                        <td><a href="mailto:{{ $contacto->email }}">{{ $contacto->email }}</a></td>
                        <td>{{ $contacto->asunto }}</td>
                        <td>
                            <span title="{{ $contacto->mensaje }}">
                                {{ Str::limit($contacto->mensaje, 60) }}
                            </span>
                        </td>
                        <td>
                            <form method="POST" action="{{ route('admin.contactos.estado', $contacto) }}">
                                @csrf @method('PATCH')
                                <select name="estado" onchange="this.form.submit()"
                                    class="estado-select estado-{{ $contacto->estado === 'nuevo' ? 'pendiente' : ($contacto->estado === 'leído' ? 'confirmada' : 'completada') }}">
                                    <option value="nuevo"      {{ $contacto->estado === 'nuevo'      ? 'selected' : '' }}>🔵 Nuevo</option>
                                    <option value="leído"      {{ $contacto->estado === 'leído'      ? 'selected' : '' }}>🟡 Leído</option>
                                    <option value="respondido" {{ $contacto->estado === 'respondido' ? 'selected' : '' }}>🟢 Respondido</option>
                                </select>
                            </form>
                        </td>
                        <td>{{ $contacto->created_at->format('d/m/Y H:i') }}</td>
                        <td>
                            <form method="POST" action="{{ route('admin.contactos.destroy', $contacto) }}"
                                  onsubmit="return confirm('¿Eliminar este mensaje?')">
                                @csrf @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm">🗑 Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="8" style="text-align:center; padding: 2rem;">
                            No hay mensajes de contacto todavía.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</section>
@endsection
