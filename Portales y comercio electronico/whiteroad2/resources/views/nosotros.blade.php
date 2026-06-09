@extends('layouts.app')

@section('title', 'Sobre Nosotros')

@section('content')
<section class="container">
    <div class="section-header">
        <h2>Sobre <span>WhiteRoad</span></h2>
        <p>Conocé nuestra historia, nuestra filosofía y nuestro equipo.</p>
    </div>

    <div class="services-grid">
        <div class="card">
            <div class="card-content">
                <h3>Nuestra Historia</h3>
                <p>WhiteRoad nació en 2015 con una misión clara: brindar un servicio de mantenimiento y reparación de motocicletas de calidad profesional, con atención personalizada y precios justos.</p>
                <p>Lo que comenzó como un pequeño taller familiar hoy se ha convertido en un referente del sector.</p>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h3>Nuestra Filosofía</h3>
                <p>Creemos que cada moto merece un trato especial. Por eso explicamos cada trabajo, detallamos los costos y solo realizamos las reparaciones necesarias.</p>
                <p>Trabajamos con transparencia y compromiso en cada paso.</p>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h3>Valores</h3>
                <ul style="list-style-position: inside;">
                    <li><strong>Calidad:</strong> Excelencia en cada trabajo.</li>
                    <li><strong>Integridad:</strong> Honestidad en nuestros presupuestos.</li>
                    <li><strong>Profesionalismo:</strong> Equipo certificado y actualizado.</li>
                    <li><strong>Puntualidad:</strong> Respetamos tu tiempo.</li>
                    <li><strong>Garantía:</strong> Servicio confiable y seguro.</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="section-header mt-5">
        <h2>Nuestro <span>Equipo</span></h2>
        <p>Profesionales apasionados por las motos.</p>
    </div>

    <div class="services-grid">
        <div class="card">
            <div class="card-content text-center">
                <div class="card-image card-image-team">👨‍🔧</div>
                <h3 class="card-title">Carlos Rodríguez</h3>
                <p class="card-description">Fundador y mecánico jefe. 20 años de experiencia en motos de alta cilindrada.</p>
            </div>
        </div>
        <div class="card">
            <div class="card-content text-center">
                <div class="card-image card-image-team">👩‍🔧</div>
                <h3 class="card-title">Ana Martínez</h3>
                <p class="card-description">Especialista en diagnóstico electrónico, certificada por los principales fabricantes.</p>
            </div>
        </div>
        <div class="card">
            <div class="card-content text-center">
                <div class="card-image card-image-team">👨‍🔧</div>
                <h3 class="card-title">Juan Pérez</h3>
                <p class="card-description">Experto en mantenimiento y sistemas de frenos, con atención detallada en cada moto.</p>
            </div>
        </div>
    </div>
</section>

<section class="hero-cta">
    <div class="hero-content">
        <h2>¿Querés conocer <span>más</span>?</h2>
        <p>Visitános en nuestro taller o contactanos para recibir asesoramiento personalizado.</p>
        <div class="hero-buttons">
            <a href="{{ route('contacto') }}" class="btn btn-primary">Contactar</a>
            <a href="{{ route('servicios.index') }}" class="btn btn-secondary">Ver Servicios</a>
        </div>
    </div>
</section>
@endsection
