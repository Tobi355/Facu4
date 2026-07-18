@extends('layouts.admin')

@section('title', 'Dashboard Admin')

@section('content')

<section class="admin-section container">

    <div class="section-header">
        <h2>Dashboard</h2>
        <p>Resumen general del sistema y actividad reciente.</p>
    </div>

    <div class="dashboard-stats">

        <div class="stat-card">
            <h4>Usuarios</h4>
            <span>{{ $totalUsuarios }}</span>
        </div>

        <div class="stat-card">
            <h4>Servicios</h4>
            <span>{{ $totalServicios }}</span>
        </div>

        <div class="stat-card">
            <h4>Órdenes</h4>
            <span>{{ $totalOrdenes }}</span>
        </div>

        <div class="stat-card">
            <h4>Facturación</h4>
            <span>${{ number_format($facturacionTotal,0,',','.') }}</span>
        </div>

        <div class="stat-card">
            <h4>Pendientes</h4>
            <span>{{ $ordenesPendientes }}</span>
        </div>

        <div class="stat-card">
            <h4>Pagadas</h4>
            <span>{{ $ordenesPagadas }}</span>
        </div>

        <div class="stat-card">
            <h4>Terminadas</h4>
            <span>{{ $ordenesTerminadas }}</span>
        </div>

        <div class="stat-card">
            <h4>Mensajes nuevos</h4>
            <span>{{ $totalContactos }}</span>
        </div>

    </div>

    <div class="mt-5">

        <h3>Últimas órdenes</h3>

        <div class="admin-table-container">

            <table class="admin-table">

                <thead>

                    <tr>

                        <th>#</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Fecha</th>

                    </tr>

                </thead>

                <tbody>

                @forelse($ultimasOrdenes as $order)

                    <tr>

                        <td>#{{ $order->id }}</td>

                        <td>{{ $order->user->name }}</td>

                        <td>

                            ${{ number_format($order->total,0,',','.') }}

                        </td>

                        <td>

                            @switch(strtolower($order->status))

                                @case('pending')

                                    <span class="badge bg-warning text-dark">

                                        Pendiente

                                    </span>

                                    @break

                                @case('paid')

                                    <span class="badge bg-success">

                                        Pagada

                                    </span>

                                    @break

                                @case('completed')

                                    <span class="badge bg-primary">

                                        Terminada

                                    </span>

                                    @break

                                @case('failed')

                                    <span class="badge bg-danger">

                                        Fallida

                                    </span>

                                    @break

                                @default

                                    {{ ucfirst($order->status) }}

                            @endswitch

                        </td>

                        <td>

                            {{ $order->created_at->format('d/m/Y H:i') }}

                        </td>

                    </tr>

                @empty

                    <tr>

                        <td colspan="5" class="text-center">

                            No hay órdenes registradas.

                        </td>

                    </tr>

                @endforelse

                </tbody>

            </table>

        </div>

    </div>

</section>

@endsection
