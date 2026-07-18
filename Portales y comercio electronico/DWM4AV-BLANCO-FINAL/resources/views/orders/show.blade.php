@extends('layouts.app')

@section('title','Detalle de compra')

@section('content')

<div class="container py-5">

    <div class="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h1 class="fw-bold">

                Compra #{{ $order->id }}

            </h1>

            <p class="text-muted mb-0">

                Realizada el {{ $order->created_at->format('d/m/Y H:i') }}

            </p>

        </div>

        <a
            href="{{ route('orders.index') }}"
            class="btn btn-outline-secondary">

            ← Volver

        </a>

    </div>

    <div class="row mb-4">

        <div class="col-md-6">

            <div class="card shadow-sm">

                <div class="card-body">

                    <h5 class="card-title">

                        Estado de la orden

                    </h5>

                    @switch($order->status)

                        @case('pending')

                            <span class="badge bg-warning text-dark fs-6">

                                Pendiente

                            </span>

                            @break

                        @case('paid')

                            <span class="badge bg-success fs-6">

                                Pagada

                            </span>

                            @break

                        @case('completed')

                            <span class="badge bg-primary fs-6">

                                Terminada

                            </span>

                            @break

                        @case('failed')

                            <span class="badge bg-danger fs-6">

                                Fallida

                            </span>

                            @break

                        @default

                            <span class="badge bg-secondary fs-6">

                                {{ ucfirst($order->status) }}

                            </span>

                    @endswitch

                </div>

            </div>

        </div>

        <div class="col-md-6">

            <div class="card shadow-sm">

                <div class="card-body">

                    <h5 class="card-title">

                        Total abonado

                    </h5>

                    <h2 class="text-success mb-0">

                        ${{ number_format($order->total,0,',','.') }}

                    </h2>

                </div>

            </div>

        </div>

    </div>

    <div class="card shadow-sm">

        <div class="card-header">

            <strong>Servicios contratados</strong>

        </div>

        <div class="table-responsive">

            <table class="table table-hover align-middle mb-0">

                <thead class="table-dark">

                    <tr>

                        <th>Servicio</th>
                        <th>Cantidad</th>
                        <th>Precio unitario</th>
                        <th>Subtotal</th>

                    </tr>

                </thead>

                <tbody>

                @foreach($order->items as $item)

                    <tr>

                        <td>

                            {{ $item->servicio->nombre }}

                        </td>

                        <td>

                            {{ $item->quantity }}

                        </td>

                        <td>

                            ${{ number_format($item->price,0,',','.') }}

                        </td>

                        <td>

                            <strong>

                                ${{ number_format($item->subtotal,0,',','.') }}

                            </strong>

                        </td>

                    </tr>

                @endforeach

                </tbody>

                <tfoot>

                    <tr>

                        <th colspan="3" class="text-end">

                            TOTAL

                        </th>

                        <th>

                            ${{ number_format($order->total,0,',','.') }}

                        </th>

                    </tr>

                </tfoot>

            </table>

        </div>

    </div>

</div>

@endsection
