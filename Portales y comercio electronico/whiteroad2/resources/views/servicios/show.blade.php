@extends('layouts.app')

@section('title', $servicio->nombre)

@section('content')
<section class="container">
    <div class="service-detail">
        <div class="service-detail-image">
            <div class="placeholder">{{ $servicio->imagen ?? '🔧' }}</div>
        </div>
        <div class="service-detail-info">
            <h2>{{ $servicio->nombre }}</h2>
            <div class="service-detail-price">{{ number_format($servicio->precio, 0, ',', '.') }} ARS</div>
            <div class="service-detail-meta">
                <div class="meta-item">
                    <span>Duración</span>
                    <strong>{{ $servicio->duracion }}</strong>
                </div>
                <div class="meta-item">
                    <span>Categoría</span>
                    <strong>{{ $servicio->categoria->nombre }}</strong>
                </div>
            </div>
            <div class="service-detail-description">
                <h3>Descripción</h3>
                <p>{{ $servicio->descripcion }}</p>
            </div>
            @if($servicio->condiciones)
                <div class="service-detail-conditions">
                    <h3>Condiciones</h3>
                    <p>{{ $servicio->condiciones }}</p>
                </div>
            @endif
            @auth
                <form action="{{ route('reservas.store') }}" method="POST">
                    @csrf
                    <input type="hidden" name="servicio_id" value="{{ $servicio->id }}">
                    <div class="form-group">
                        <label for="fecha">Fecha</label>
                        <input type="date" name="fecha" id="fecha" required min="{{ date('Y-m-d') }}">
                    </div>
                    <div class="form-group">
                        <label for="hora">Hora</label>
                        <select name="hora" id="hora" required>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="observaciones">Observaciones</label>
                        <textarea name="observaciones" id="observaciones" rows="2"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Reservar</button>
                </form>
            @else
                <p>Para reservar, <a href="{{ route('login') }}">iniciá sesión</a>.</p>
            @endauth
        </div>
    </div>
</section>
@endsection
