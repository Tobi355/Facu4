@extends('layouts.app')

@section('title', 'Servicios')

@section('content')

<section class="container">

    <div class="section-header">
        <h2>Nuestros <span>Servicios</span></h2>
        <p>Encontrá el servicio que necesita tu moto</p>
    </div>

    <div class="filters">

        <a href="{{ route('servicios.index') }}"
           class="filter-btn">

            Todas

        </a>

        @foreach($categorias as $categoria)

            <a href="#"
               class="filter-btn">

                {{ $categoria->nombre }}

            </a>

        @endforeach

    </div>

    <div class="services-grid">

        @forelse($servicios as $servicio)

            <article class="service-card">

                <img
                    src="{{ asset('images/' . $servicio->imagen) }}"
                    alt="{{ $servicio->nombre }}"
                >

                <div class="service-content">

                    <span class="service-category">

                        {{ $servicio->categoria->nombre }}

                    </span>

                    <h3>{{ $servicio->nombre }}</h3>

                    <p>{{ $servicio->descripcion }}</p>

                    <p>

                        <strong>Duración:</strong>

                        {{ $servicio->duracion }}

                    </p>

                    <p class="service-price">

                        ${{ number_format($servicio->precio, 0, ',', '.') }}

                    </p>

                    <a
                        href="{{ route('servicios.show', $servicio) }}"
                        class="btn btn-primary"
                    >
                        Ver detalle
                    </a>

                </div>

            </article>

        @empty

            <p>No hay servicios disponibles.</p>

        @endforelse

    </div>

</section>

@endsection
