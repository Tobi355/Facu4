@extends('layouts.app')

@section('title', 'Sobre Nosotros')

@section('content')
<section class="container">
    <div class="section-header">
    <h2>Sobre <span>WhiteRoad</span></h2>
    <p>Conocé nuestra historia y nuestro equipo</p>
    </div>

    <div class="service-detail mb-4">
    <div>
        <h3 class="mb-2">Nuestra Historia</h3>
        <p>WhiteRoad nació en 2015 con una misión clara: brindar un servicio de mantenimiento y reparación de motocicletas de calidad profesional, con atención personalizada y precios justos.</p>
        <p>Lo que comenzó como un pequeño taller familiar, hoy se ha convertido en un referente del sector, atendiendo a más de 500 clientes mensuales y trabajando con todas las marcas y modelos del mercado.</p>

        <h3 class="mt-3 mb-2">Nuestra Filosofía</h3>
        <p>Creemos que cada moto es única y merece un trato especial. Por eso, nos tomamos el tiempo necesario para entender las necesidades de cada cliente y ofrecer soluciones personalizadas.</p>
        <p>Nuestro compromiso es la transparencia: explicamos cada trabajo, detallamos los costos y solo realizamos las reparaciones realmente necesarias.</p>
    </div>
    <div>
        <div class="service-detail-image">
        <img src="{{ asset('storage/a.webp') }}" alt="imagen taller" class="object-fit-cover border rounded">
        </div>
    </div>
    </div>


    <div class="section-header">
    <h2>Nuestros <span>Valores</span></h2>
    </div>
    <div class="services-grid">
    <div class="card fade-in">
        <div class="card-content">
        <img src="{{ asset('storage/b.webp') }}" alt="imagen honestidad" class="object-fit-cover border rounded">
        <h3 class="card-title">Honestidad</h3>
        <p class="card-description">Trato transparente con nuestros clientes. Solo hacemos los trabajos que tu moto realmente necesita.</p>
        </div>
    </div>
    <div class="card fade-in">
        <div class="card-content">
        <img src="{{ asset('storage/c.webp') }}" alt="imagen capacitación" class="object-fit-cover border rounded">
        <h3 class="card-title">Capacitación</h3>
        <p class="card-description">Nuestro equipo se actualiza constantemente con las últimas tecnologías y técnicas del sector.</p>
        </div>
    </div>
    <div class="card fade-in">
        <div class="card-content">
        <img src="{{ asset('storage/d.webp') }}" alt="imagen compromiso" class="object-fit-cover border rounded">
        <h3 class="card-title">Compromiso</h3>
        <p class="card-description">Cada trabajo lo hacemos como si fuera para nuestra propia moto. La calidad es nuestra prioridad.</p>
        </div>
    </div>
    </div>


    <div class="section-header mt-3">
    <h2>Nuestro <span>Equipo</span></h2>
    <p>Profesionales apasionados por las motos</p>
    </div>
    <div class="services-grid">
    <div class="card fade-in">
        <div class="card-content text-center">
        <img src="{{ asset('storage/e.webp') }}" alt="imagen Carlos Rodríguez" class="object-fit-cover border rounded">
        <h3 class="card-title">Carlos Rodríguez</h3>
        <p class="card-description">Fundador y mecánico jefe. 20 años de experiencia en motos de alta cilindrada.</p>
        </div>
    </div>
    <div class="card fade-in">
        <div class="card-content text-center">
        <img src="{{ asset('storage/g.webp') }}" alt="imagen Ana Martínez" class="object-fit-cover border rounded">
        <h3 class="card-title">Ana Martínez</h3>
        <p class="card-description">Especialista en diagnóstico electrónico. Certificada por los principales fabricantes.</p>
        </div>
    </div>
    <div class="card fade-in">
        <div class="card-content text-center">
        <img src="{{ asset('storage/f.webp') }}" alt="imagen Juan Pérez" class="object-fit-cover border rounded">
        <h3 class="card-title">Juan Pérez</h3>
        <p class="card-description">Mecánico de mantenimiento. Experto en carburación y sistemas de frenos.</p>
        </div>
    </div>
    </div>
</section>


<section class="hero">
    <div class="hero-content">
        <h2>¿Querés conocer <span>más</span>?</h2>
        <p>Visitanos en nuestro taller o contactanos por cualquier consulta</p>
        <div class="hero-buttons">
            <a href="{{ route('contacto') }}" class="btn btn-primary">Contactar</a>
            <a href="{{ route('servicios.index') }}" class="btn btn-secondary">Ver Servicios</a>
        </div>
    </div>
</section>
@endsection
