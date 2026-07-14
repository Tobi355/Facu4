@extends('layouts.app')

@section('title', 'Inicio')

@section('content')

    <section class="hero">


        <div class="hero-top-bar"></div>


        <canvas id="hero-canvas"></canvas>


        <div class="hero-deco-left">
            <div class="hero-deco-line deco-60"></div>
            <div class="hero-deco-line deco-40"></div>
            <div class="hero-deco-line deco-80"></div>
            <div class="hero-deco-line deco-30"></div>
        </div>


        <div class="hero-deco-right">
            <div class="hero-deco-line deco-60"></div>
            <div class="hero-deco-line deco-40"></div>
            <div class="hero-deco-line deco-80"></div>
            <div class="hero-deco-line deco-30"></div>
        </div>


        <div class="hero-floating-card hero-fc-left">
            <div class="fc-label">Satisfacción</div>
            <div class="fc-value">98%</div>
            <div class="fc-sub">Clientes felices</div>
        </div>


        <div class="hero-floating-card hero-fc-right">
            <div class="fc-label">Experiencia</div>
            <div class="fc-value">10+</div>
            <div class="fc-sub">Años en el rubro</div>
        </div>


        <div class="hero-content" id="hero-content">

            <div class="hero-eyebrow">
            <span>Taller Especializado</span>
            </div>

            <h1>
            Tu Moto En Las
            <span class="word-highlight" data-text="Mejores Manos">Mejores Manos</span>
            </h1>

            <p>
            Especialistas en mantenimiento y reparación de motocicletas.
            Servicio profesional con garantía y los mejores precios del mercado.
            </p>

            <div class="hero-stats">
            <div class="hero-stat">
                <div class="hero-stat-number" data-target="500">0</div>
                <div class="hero-stat-label">Clientes / mes</div>
            </div>
            <div class="hero-stat">
                <div class="hero-stat-number" data-target="10">0</div>
                <div class="hero-stat-label">Años de exp.</div>
            </div>
            <div class="hero-stat">
                <div class="hero-stat-number" data-target="98">0</div>
                <div class="hero-stat-label">% Satisfacción</div>
            </div>
            </div>

            <div class="hero-buttons">
            <a href="{{ route('servicios.index') }}" class="btn btn-primary">Ver Servicios</a>
            <a href="{{ route('contacto') }}" class="btn btn-secondary">Contactar</a>
            </div>

        </div>


        <div class="hero-scroll">
            <span class="hero-scroll-text">Scroll</span>
            <div class="hero-scroll-line"></div>
        </div>

    </section>


    <section class="container">
        <div class="section-header">
            <h2>Servicios <span>Destacados</span></h2>
            <p>Conocé los servicios más solicitados por nuestros clientes</p>
        </div>
        <div class="services-grid">
            @forelse($servicios ?? [] as $servicio)
                <article class="service-card">
                    @php $imgPath = public_path('storage/' . ($servicio->imagen ?? '')); @endphp
                    @if(!empty($servicio->imagen) && file_exists($imgPath))
                        <img src="{{ asset('storage/' . $servicio->imagen) }}" alt="{{ $servicio->nombre }}">
                    @else
                        <div class="card-image">🔧</div>
                    @endif
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
        <div class="text-center mt-3">
            <a href="{{ route('servicios.index') }}" class="btn btn-primary">Ver todos los servicios</a>
        </div>
    </section>


    <section class="container">
        <div class="section-header">
            <h2>¿Por qué <span>WhiteRoad</span>?</h2>
            <p>Más de 10 años de experiencia nos respaldan</p>
        </div>
        <div class="services-grid">
            <div class="card fade-in">
            <div class="card-content">
                <div class="card-image">🏆</div>
                <h3 class="card-title">Experiencia</h3>
                <p class="card-description">Más de una década trabajando con motos de todas las marcas y cilindradas.</p>
            </div>
            </div>
            <div class="card fade-in">
            <div class="card-content">
                <div class="card-image">⚡</div>
                <h3 class="card-title">Rapidez</h3>
                <p class="card-description">Entregas en tiempo récord sin comprometer la calidad del trabajo.</p>
            </div>
            </div>
            <div class="card fade-in">
            <div class="card-content">
                <div class="card-image">💯</div>
                <h3 class="card-title">Garantía</h3>
                <p class="card-description">Todos nuestros servicios cuentan con garantía de satisfacción.</p>
            </div>
            </div>
        </div>
    </section>


    <section class="hero-cta">
        <div class="hero-top-bar"></div>
        <canvas class="hero-canvas-mini" id="jala"></canvas>
        <div class="hero-content">
            <div class="hero-eyebrow">Reservas Online</div>
            <h2 class="hero-cta-title">
            ¿Listo para el <span class="highlight">Service</span>?
            </h2>
            <p>
            Reservá tu turno online y evitá esperas
            </p>
            <div class="hero-buttons">
            <a href="{{ route('servicios.index') }}" class="btn btn-primary">Reservar Turno</a>
            <a href="{{ route('contacto') }}" class="btn btn-secondary">Consultar</a>
            </div>
        </div>
    </section>

@endsection

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/hero-enhanced.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('js/hero3d.js') }}"></script>
@endpush
