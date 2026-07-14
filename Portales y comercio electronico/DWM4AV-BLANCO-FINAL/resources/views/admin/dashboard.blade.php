@extends('layouts.admin')

@section('title', 'Dashboard Admin')

@section('content')
<section class="admin-section container">
    <div class="section-header">
        <h2>Dashboard</h2>
        <p>Resumen rápido del estado del sitio y las reservas recientes.</p>
    </div>

    <div class="dashboard-stats">
        <div class="stat-card">Usuarios: {{ $totalUsuarios }}</div>
        <div class="stat-card">Servicios: {{ $totalServicios }}</div>
        <div class="stat-card">Reservas: {{ $totalReservas }}</div>
        <div class="stat-card">Categorías: {{ $totalCategorias }}</div>
        <div class="stat-card">Mensajes nuevos: {{ $totalContactos }}</div>
    </div>

    <h3>Reservas recientes</h3>
    <div class="admin-table-container">
        <table class="admin-table">
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
    </div>
</section>
@endsection
