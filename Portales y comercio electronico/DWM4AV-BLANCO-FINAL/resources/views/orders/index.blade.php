@extends('layouts.app')

@section('title','Mis Compras')

@section('content')

<div class="container py-5">

    <h1 class="mb-4">

        Mis Compras

    </h1>

    @if($orders->count())

        <table class="table table-striped">

            <thead>

            <tr>

                <th>#</th>

                <th>Fecha</th>

                <th>Total</th>

                <th>Estado</th>

                <th></th>

            </tr>

            </thead>

            <tbody>

            @foreach($orders as $order)

                <tr>

                    <td>{{ $order->id }}</td>

                    <td>{{ $order->created_at->format('d/m/Y') }}</td>

                    <td>${{ number_format($order->total,0,',','.') }}</td>

                    <td>

                        {{ ucfirst($order->status) }}

                    </td>

                    <td>

                        <a
                            href="{{ route('orders.show',$order) }}"
                            class="btn btn-primary btn-sm">

                            Ver detalle

                        </a>

                    </td>

                </tr>

            @endforeach

            </tbody>

        </table>

        {{ $orders->links() }}

    @else

        <div class="alert alert-info">

            Todavía no realizaste ninguna compra.

        </div>

    @endif

</div>

@endsection
