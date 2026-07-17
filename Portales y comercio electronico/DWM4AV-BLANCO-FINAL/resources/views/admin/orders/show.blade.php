@extends('layouts.admin')

@section('title','Detalle Orden')

@section('content')

<div class="container-fluid">

    <h1>Orden #{{ $order->id }}</h1>

    <hr>

    <p><strong>Cliente:</strong> {{ $order->user->name }}</p>

    <p><strong>Email:</strong> {{ $order->user->email }}</p>

    <p><strong>Estado:</strong> {{ ucfirst($order->status) }}</p>

    <p><strong>Total:</strong> ${{ number_format($order->total,0,',','.') }}</p>

    <table class="table">

        <thead>

            <tr>

                <th>Servicio</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>

            </tr>

        </thead>

        <tbody>

        @foreach($order->items as $item)

            <tr>

                <td>{{ $item->servicio->nombre }}</td>

                <td>{{ $item->quantity }}</td>

                <td>${{ number_format($item->price,0,',','.') }}</td>

                <td>${{ number_format($item->subtotal,0,',','.') }}</td>

            </tr>

        @endforeach

        </tbody>

    </table>

</div>

@endsection
