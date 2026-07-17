@extends('layouts.admin')

@section('title','Órdenes')

@section('content')

<div class="container-fluid">

    <h1 class="mb-4">Órdenes</h1>

    <table class="table table-hover align-middle">

        <thead>

            <tr>

                <th>#</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th></th>

            </tr>

        </thead>

        <tbody>

        @foreach($orders as $order)

            <tr>

                <td>{{ $order->id }}</td>

                <td>{{ $order->user->name }}</td>

                <td>${{ number_format($order->total,0,',','.') }}</td>

                <td>{{ ucfirst($order->status) }}</td>

                <td>{{ $order->created_at->format('d/m/Y H:i') }}</td>

                <td>

                    <a
                        href="{{ route('admin.orders.show',$order) }}"
                        class="btn btn-primary btn-sm">

                        Ver

                    </a>

                </td>

            </tr>

        @endforeach

        </tbody>

    </table>

    {{ $orders->links() }}

</div>

@endsection
