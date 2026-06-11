@extends('layouts.admin')

@section('title', 'Reservas - Admin')

@section('content')
<section class="admin-section container">
    <div class="section-header">
        <h2>Reservas</h2>
    </div>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="admin-table-container">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach($reservas as $reserva)
                    <tr>
                        <td>{{ $reserva->id }}</td>
                        <td>{{ $reserva->usuario->name }}</td>
                        <td>{{ $reserva->servicio->nombre }}</td>
                        <td>{{ \Carbon\Carbon::parse($reserva->fecha)->format('d/m/Y') }}</td>
                        <td>{{ $reserva->hora ?? 'N/A' }}</td>
                        <td>
                            <form action="{{ route('admin.reservas.estado', $reserva) }}" method="POST" class="admin-table-form">
                                @csrf
                                @method('PATCH')
                                <select name="estado" class="estado-select">
                                    <option value="pendiente" {{ $reserva->estado === 'pendiente' ? 'selected' : '' }}>Pendiente</option>
                                    <option value="confirmada" {{ $reserva->estado === 'confirmada' ? 'selected' : '' }}>Confirmada</option>
                                    <option value="completada" {{ $reserva->estado === 'completada' ? 'selected' : '' }}>Completada</option>
                                    <option value="cancelada" {{ $reserva->estado === 'cancelada' ? 'selected' : '' }}>Cancelada</option>
                                </select>
                            </form>
                        </td>
                        <td>
                            <button type="button" class="btn btn-info btn-sm btn-reserva-details" data-reserva-id="{{ $reserva->id }}">Ver</button>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    @if($reservas->isEmpty())
        <p class="empty-state">No hay reservas registradas.</p>
    @endif
</section>

<!-- Modal de detalles de reserva -->
<div id="reserveDetailsModal" class="modal-overlay" data-reservas="{{ json_encode($reservas->keyBy('id')->toArray(), JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE) }}">
    <div class="modal-content reserve-details-modal">
        <button type="button" class="modal-close" aria-label="Cerrar">&times;</button>
        <h3 class="modal-title">Detalles de la Reserva</h3>
        <div id="reserveDetailsContent" class="reserve-details-content">
            <!-- Se llena dinámicamente -->
        </div>
    </div>
</div>

@endsection


