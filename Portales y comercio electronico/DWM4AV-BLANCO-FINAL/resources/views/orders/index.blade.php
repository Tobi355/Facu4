@extends('layouts.app')

@section('title','Mis Compras')

@section('content')

<div class="container py-5">

    <div class="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h1 class="fw-bold mb-1">Mis Compras</h1>

            <p class="text-muted mb-0">

                Historial de todas tus órdenes.

            </p>

        </div>

    </div>

    @if($orders->count())

        <div class="table-responsive shadow-sm rounded">

            <table class="table table-hover align-middle mb-0">

                <thead class="table-dark">

                    <tr>

                        <th>Orden</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th class="text-center">Acciones</th>

                    </tr>

                </thead>

                <tbody>

                @foreach($orders as $order)

                    <tr>

                        <td>

                            <strong>#{{ $order->id }}</strong>

                        </td>

                        <td>

                            {{ $order->created_at->format('d/m/Y') }}

                            <br>

                            <small class="text-muted">

                                {{ $order->created_at->format('H:i') }}

                            </small>

                        </td>

                        <td>

                            <strong>

                                ${{ number_format($order->total,0,',','.') }}

                            </strong>

                        </td>

                        <td>

                            @switch($order->status)

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

                                    <span class="badge bg-secondary">

                                        {{ ucfirst($order->status) }}

                                    </span>

                            @endswitch

                        </td>

                        <td class="text-center">

                            <a
                                href="{{ route('orders.show',$order) }}"
                                class="btn btn-outline-primary btn-sm">

                                Ver detalle

                            </a>

                        </td>

                    </tr>

                @endforeach

                </tbody>

            </table>

        </div>

        <div class="mt-4">

            {{ $orders->links() }}

        </div>

    @else

        <div class="alert alert-info text-center">

            <h5 class="mb-2">

                Todavía no realizaste ninguna compra.

            </h5>

            <p class="mb-3">

                Cuando compres un servicio aparecerá aquí.

            </p>

            <a
                href="{{ route('servicios.index') }}"
                class="btn btn-primary">

                Ver servicios

            </a>

        </div>

    @endif

</div>

@endsection
