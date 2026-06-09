@extends('layouts.app')

@section('title', 'Contacto')

@section('content')
<section class="container">
    <div class="section-header">
        <h2>Contacto</h2>
        <p>¿Tenés alguna consulta? Escribinos y te respondemos rápido.</p>
    </div>

    <div class="services-grid">
        <div class="card">
            <div class="card-content">
                <h3>Información de Contacto</h3>

                <div class="info-item">
                    <h4>📍 Dirección</h4>
                    <p>Av. Siempre Viva 1234<br>Buenos Aires, Argentina</p>
                </div>

                <div class="info-item">
                    <h4>📞 Teléfono</h4>
                    <p><a href="tel:+541145678901">(011) 4567-8901</a><br><a href="tel:+54111512345678">(011) 15-1234-5678</a></p>
                </div>

                <div class="info-item">
                    <h4>✉️ Email</h4>
                    <p><a href="mailto:info@whiteroad.com">info@whiteroad.com</a><br><a href="mailto:turnos@whiteroad.com">turnos@whiteroad.com</a></p>
                </div>

                <div class="info-item">
                    <h4>🕐 Horarios</h4>
                    <p>Lunes a Viernes: 8:00 - 18:00<br>Sábados: 9:00 - 13:00<br>Domingos: Cerrado</p>
                </div>

                <div class="info-item">
                    <h4>Redes Sociales</h4>
                    <p><a href="#">Instagram</a> · <a href="#">Facebook</a> · <a href="#">WhatsApp</a></p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h3>Formulario de Contacto</h3>

                @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                @endif

                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form method="POST" action="{{ route('contacto.store') }}">
                    @csrf

                    <div class="form-group">
                        <label for="nombre">Nombre *</label>
                        <input type="text" id="nombre" name="nombre" required value="{{ old('nombre') }}">
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required value="{{ old('email') }}">
                    </div>

                    <div class="form-group">
                        <label for="telefono">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" value="{{ old('telefono') }}">
                    </div>

                    <div class="form-group">
                        <label for="asunto">Asunto *</label>
                        <input type="text" id="asunto" name="asunto" required value="{{ old('asunto') }}">
                    </div>

                    <div class="form-group">
                        <label for="mensaje">Mensaje *</label>
                        <textarea id="mensaje" name="mensaje" rows="6" required>{{ old('mensaje') }}</textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    </div>

    <div class="service-detail-image placeholder placeholder-map mt-4">
        🗺️
        <span class="placeholder-text">Acá iría el mapa de Google Maps</span>
    </div>
</section>
@endsection
