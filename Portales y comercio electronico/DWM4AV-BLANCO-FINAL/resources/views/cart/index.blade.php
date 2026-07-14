@extends('layouts.app')

@section('title', 'Carrito')

@section('content')

<div class="container py-5">

    <h1 class="mb-4">
        Mi carrito
    </h1>

    @if(count($cart))

        <table class="table">
            <thead>
                <tr>
                    <th>Servicio</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            @php($total = 0)
            @foreach($cart as $item)
                @php($subtotal = $item['precio'] * $item['quantity'])
                @php($total += $subtotal)
                <tr>
                    <td>{{ $item['nombre'] }}</td>
                    <td>${{ number_format($item['precio'],0,',','.') }}</td>
                    <td>{{ $item['quantity'] }}</td>
                    <td>${{ number_format($subtotal,0,',','.') }}</td>
                    <td>
                        <form method="POST" action="{{ route('cart.remove',$item['id']) }}">
                            @csrf
                            <button class="btn btn-danger btn-sm">
                                Eliminar
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>

        <h3 class="text-end">
            Total:
            ${{ number_format($total,0,',','.') }}
        </h3>

        <a href="{{ route('checkout.index') }}" class="btn btn-primary">
            Continuar al checkout
        </a>

        <form method="POST" action="{{ route('cart.clear') }}">
            @csrf
            <button class="btn btn-secondary">
                Vaciar carrito
            </button>
        </form>

    @else

        <div class="alert alert-info">
            No hay servicios agregados.
        </div>

    @endif

</div>

@endsection
