@extends('layouts.app')

@section('title','Checkout')

@section('content')

<div class="container py-5">

    <h1>Resumen de compra</h1>

    @php($total = 0)

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

        @foreach($cart as $item)

            @php($subtotal = $item['precio'] * $item['quantity'])

            @php($total += $subtotal)

            <tr>

                <td>{{ $item['nombre'] }}</td>

                <td>{{ $item['quantity'] }}</td>

                <td>${{ number_format($item['precio'],0,',','.') }}</td>

                <td>${{ number_format($subtotal,0,',','.') }}</td>

            </tr>

        @endforeach

        </tbody>

    </table>

    <h3 class="text-end">

        Total: ${{ number_format($total,0,',','.') }}

    </h3>

    <form method="POST" action="{{ route('checkout.store') }}">

        @csrf

        <button class="btn btn-success">

            Confirmar compra

        </button>

    </form>

</div>

@endsection
