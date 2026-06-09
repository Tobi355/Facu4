@extends('layouts.admin')

@section('content')

<div class="admin-section">
    <div class="section-header">
        <h2>Reservas</h2>
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
                <th>Usuario</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Observaciones</th>
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
                    <td>
                        <form action="{{ route('admin.reservas.estado', $reserva) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('PATCH')
                            <select name="estado" class="form-control-small" onchange="this.form.submit()">
                                <option value="pendiente" {{ $reserva->estado === 'pendiente' ? 'selected' : '' }}>Pendiente</option>
                                <option value="confirmada" {{ $reserva->estado === 'confirmada' ? 'selected' : '' }}>Confirmada</option>
                                <option value="completada" {{ $reserva->estado === 'completada' ? 'selected' : '' }}>Completada</option>
                                <option value="cancelada" {{ $reserva->estado === 'cancelada' ? 'selected' : '' }}>Cancelada</option>
                            </select>
                        </form>
                    </td>
                    <td>{{ $reserva->observaciones ? substr($reserva->observaciones, 0, 50) . '...' : 'N/A' }}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="showDetails({{ $reserva->id }})">Ver</button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @if($reservas->isEmpty())
        <p class="text-center text-muted">No hay reservas registradas.</p>
    @endif
</div>

<!-- Modal simple para detalles -->
<div id="detailsModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000;">
    <div style="background: white; margin: 50px auto; padding: 20px; width: 90%; max-width: 500px; border-radius: 8px;">
        <span style="float: right; cursor: pointer; font-size: 20px;" onclick="closeDetails()">&times;</span>
        <h3>Detalles de la Reserva</h3>
        <div id="modalContent"></div>
    </div>
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
        font-size: 14px;
    }

    .table th {
        background-color: #f5f5f5;
        font-weight: bold;
    }

    .table tr:hover {
        background-color: #f9f9f9;
    }

    .form-control-small {
        padding: 6px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 12px;
    }

    .btn {
        padding: 6px 12px;
        border-radius: 4px;
        text-decoration: none;
        cursor: pointer;
        border: none;
        font-size: 12px;
    }

    .btn-info {
        background-color: #17a2b8;
        color: white;
    }

    .btn-sm {
        padding: 4px 8px;
        font-size: 11px;
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

<script>
    function showDetails(reservaId) {
        // Implementar obtención de detalles si es necesario
        alert('Detalles de la reserva ' + reservaId);
    }

    function closeDetails() {
        document.getElementById('detailsModal').style.display = 'none';
    }
</script>

@endsection
