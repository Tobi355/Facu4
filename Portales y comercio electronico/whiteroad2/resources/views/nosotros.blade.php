@extends('layouts.app')

@section('title', 'Sobre Nosotros')

@section('content')
<section class="container">
    <div class="section-header">
        <h2>Sobre <span>WhiteRoad</span></h2>
        <p>Conocé nuestra historia y valores</p>
    </div>

    <div class="about-content">
        <div class="about-section">
            <h3>Quiénes Somos</h3>
            <p>WhiteRoad es un taller especializado en mantenimiento y reparación de motocicletas con más de 10 años de experiencia. Nos dedicamos a brindar servicios de calidad con profesionalismo y transparencia.</p>
            <p>Contamos con un equipo altamente capacitado y equipos modernos para atender a tu moto como se merece.</p>
        </div>

        <div class="about-section">
            <h3>Misión</h3>
            <p>Proporcionar servicios de mantenimiento y reparación de motocicletas de calidad superior, garantizando la seguridad, confiabilidad y satisfacción de nuestros clientes.</p>
        </div>

        <div class="about-section">
            <h3>Visión</h3>
            <p>Ser el taller de referencia en la región, reconocido por nuestra excelencia, profesionalismo e innovación en el servicio a motocicletas.</p>
        </div>

        <div class="about-section">
            <h3>Valores</h3>
            <ul style="list-style-position: inside;">
                <li><strong>Calidad:</strong> Excelencia en cada trabajo realizado</li>
                <li><strong>Integridad:</strong> Transparencia y honestidad con nuestros clientes</li>
                <li><strong>Profesionalismo:</strong> Equipo capacitado y actualizado</li>
                <li><strong>Puntualidad:</strong> Respeto por el tiempo de nuestros clientes</li>
                <li><strong>Garantía:</strong> Compromiso con la satisfacción del cliente</li>
            </ul>
        </div>

        <div class="about-section">
            <h3>Por qué elegir WhiteRoad</h3>
            <div class="features-grid">
                <div class="feature">
                    <div class="feature-icon">🏆</div>
                    <h4>10+ años de experiencia</h4>
                    <p>Más de una década trabajando con todas las marcas y cilindradas.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">⚡</div>
                    <h4>Servicio rápido</h4>
                    <p>Entregas en tiempo récord sin comprometer la calidad.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">💯</div>
                    <h4>Garantía</h4>
                    <p>Todos nuestros servicios incluyen garantía de satisfacción.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">💰</div>
                    <h4>Mejores precios</h4>
                    <p>Precios competitivos sin sacrificar la calidad.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .about-content {
        max-width: 900px;
        margin: 40px auto;
        padding: 20px;
    }

    .about-section {
        margin-bottom: 40px;
    }

    .about-section h3 {
        color: #333;
        margin-bottom: 15px;
        font-size: 24px;
    }

    .about-section p {
        color: #666;
        line-height: 1.8;
        margin-bottom: 15px;
    }

    .about-section ul {
        color: #666;
        line-height: 1.8;
    }

    .about-section li {
        margin-bottom: 10px;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }

    .feature {
        background: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
    }

    .feature-icon {
        font-size: 40px;
        margin-bottom: 10px;
    }

    .feature h4 {
        color: #333;
        margin-bottom: 10px;
    }

    .feature p {
        color: #666;
        font-size: 14px;
        margin: 0;
    }
</style>
@endsection
