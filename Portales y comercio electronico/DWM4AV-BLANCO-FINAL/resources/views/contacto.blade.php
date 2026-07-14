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
            <div class="auth-card">
                <h3>Información de contacto</h3>
                <div class="mb-3">
                    <h4 class="text-red mb-1">📍 Dirección</h4>
                    <p>Av. Siempre Viva 1234<br>Buenos Aires, Argentina</p>
                </div>
                <div class="mb-3">
                    <h4 class="text-red mb-1">📞 Teléfono</h4>
                    <p>(011) 4567-8901<br>(011) 15-1234-5678 (WhatsApp)</p>
                </div>
                <div class="mb-3">
                    <h4 class="text-red mb-1">✉️ Email</h4>
                    <p>info@whiteroad.com<br>turnos@whiteroad.com</p>
                </div>
                <div class="mb-3">
                    <h4 class="text-red mb-1">🕐 Horarios de atención</h4>
                    <p><strong>Lunes a Viernes:</strong><br>8:00 - 18:00 hs</p>
                    <p><strong>Sábados:</strong><br>9:00 - 13:00 hs</p>
                    <p><strong>Domingos:</strong><br>Cerrado</p>
                </div>
                <div>
                    <h4 class="text-red mb-1">📱 Redes Sociales</h4>
                    <p>
                    <a target="_blank" href="https://www.instagram.com/escueladavinci/?hl=es">Instagram</a> |
                    <a target="_blank" href="https://www.facebook.com/EscuelaDavinci/?locale=es_LA">Facebook</a> |
                    <a target="_blank" href="https://wa.me/5491112345678">WhatsApp</a>
                    </p>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h3>Formulario de Contacto</h3>

                {{-- Toasters will display session messages via public/js/contacto.js --}}
                <div id="contacto-messages" class="hidden"
                    data-success="{{ session('success') ? e(session('success')) : '' }}"
                    data-error="{{ session('error') ? e(session('error')) : '' }}"
                    data-errors='@json($errors->any() ? ["Por favor complete los campos obligatorios."] : [])'>
                </div>
                @push('scripts')
                    <script src="{{ asset('js/contacto.js') }}"></script>
                @endpush

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
</section>
@endsection
