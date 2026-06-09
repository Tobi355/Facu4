@extends('layouts.app')

@section('title', 'Contacto')

@section('content')
<section class="container">
    <div class="section-header">
        <h2>Contactá<span>nos</span></h2>
        <p>Estamos aquí para ayudarte</p>
    </div>

    <div class="contact-content">
        <div class="contact-info">
            <h3>Información de Contacto</h3>

            <div class="info-item">
                <h4>📍 Ubicación</h4>
                <p>Av. Siempre Viva 1234<br>Buenos Aires, Argentina</p>
            </div>

            <div class="info-item">
                <h4>📞 Teléfono</h4>
                <p><a href="tel:+541145678901">(011) 4567-8901</a></p>
            </div>

            <div class="info-item">
                <h4>✉️ Email</h4>
                <p><a href="mailto:info@whiteroad.com">info@whiteroad.com</a></p>
            </div>

            <div class="info-item">
                <h4>🕐 Horarios</h4>
                <p>
                    Lunes a Viernes: 8:00 - 18:00<br>
                    Sábados: 9:00 - 13:00<br>
                    Domingos: Cerrado
                </p>
            </div>

            <div class="info-item">
                <h4>Redes Sociales</h4>
                <p>
                    <a href="#" style="margin-right: 15px;">Facebook</a>
                    <a href="#" style="margin-right: 15px;">Instagram</a>
                    <a href="#">WhatsApp</a>
                </p>
            </div>
        </div>

        <div class="contact-form">
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

            <form method="POST" action="/contacto">
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
</section>

<style>
    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        max-width: 1000px;
        margin: 40px auto;
        padding: 20px;
    }

    @media (max-width: 768px) {
        .contact-content {
            grid-template-columns: 1fr;
            gap: 30px;
        }
    }

    .contact-info h3,
    .contact-form h3 {
        color: #333;
        margin-bottom: 20px;
        font-size: 20px;
    }

    .info-item {
        margin-bottom: 25px;
    }

    .info-item h4 {
        color: #333;
        margin-bottom: 8px;
        font-size: 16px;
    }

    .info-item p {
        color: #666;
        line-height: 1.6;
    }

    .info-item a {
        color: #007bff;
        text-decoration: none;
    }

    .info-item a:hover {
        text-decoration: underline;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: inherit;
        font-size: 14px;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .btn {
        padding: 12px 30px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
    }

    .btn:hover {
        background-color: #0056b3;
    }

    .alert {
        padding: 12px;
        margin-bottom: 20px;
        border-radius: 4px;
    }

    .alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .alert-danger {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .alert-danger ul {
        margin: 0;
        padding-left: 20px;
    }

    .alert-danger li {
        margin: 5px 0;
    }
</style>
@endsection
