@extends('layouts.admin')

@section('content')
<div class="dashboard-stats">
    <div class="stat-card">Usuarios: {{ $totalUsuarios }}</div>
    <div class="stat-card">Servicios: {{ $totalServicios }}</div>
    <div class="stat-card">Reservas: {{ $totalReservas }}</div>
    <div class="stat-card">Categorías: {{ $totalCategorias }}</div>
</div>
<h3>Reservas recientes</h3>
<table class="table">
    <thead>...</thead>
    <tbody>
        @foreach($reservasRecientes as $reserva)
        <tr>
            <td>{{ $reserva->usuario->name }}</td>
            <td>{{ $reserva->servicio->nombre }}</td>
            <td>{{ $reserva->fecha }}</td>
            <td>{{ $reserva->estado }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection
