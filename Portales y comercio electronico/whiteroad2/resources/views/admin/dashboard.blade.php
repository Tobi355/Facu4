@extends('layouts.admin')

@section('content')
<div class="dashboard-stats">
    <div class="stat-card">Usuarios: {{ $totalUsuarios }}</div>
    <div class="stat-card">Servicios: {{ $totalServicios }}</div>
    <div class="stat-card">Reservas: {{ $totalReservas }}</div>
    <div class="stat-card">Categorías: {{ $totalCategorias }}</div>
    <div class="stat-card">Mensajes nuevos: {{ $totalContactos }}</div>
</div>
<h3>Reservas recientes</h3>
<table class="table">
    <thead>
        <tr>
            <th>Usuario</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Estado</th>
        </tr>
    </thead>
    <tbody>
        @foreach($reservasRecientes as $reserva)
        <tr>
            <td>{{ $reserva->usuario->name }}</td>
            <td>{{ $reserva->servicio->nombre }}</td>
            <td>{{ \Carbon\Carbon::parse($reserva->fecha)->format('d/m/Y') }}</td>
            <td>{{ ucfirst($reserva->estado) }}</td>
        </tr>
        @endforeach
    </tbody>
</table>

@endsection
