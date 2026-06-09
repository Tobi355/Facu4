@extends('layouts.app')

@section('title', 'Mi Perfil')

@section('content')
<section class="container">
    <div class="profile-container">
        <aside class="profile-sidebar">
            <div class="profile-avatar">{{ substr($user->name, 0, 1) }}</div>
            <h3 class="profile-name">{{ $user->name }}</h3>
            <p class="profile-email">{{ $user->email }}</p>
            <ul class="profile-menu">
                <li><a href="#" data-seccion="reservas">Mis Reservas</a></li>
                <li><a href="#" data-seccion="editar">Editar Perfil</a></li>
            </ul>
        </aside>
        <div class="profile-content">
            <div id="seccion-reservas">
                <h3>Mis Reservas</h3>
                @if($reservas->count())
                    <table class="table">
                        <thead>
                            <tr><th>Servicio</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr>
                        </thead>
                        <tbody>
                            @foreach($reservas as $reserva)
                            <tr>
                                <td>{{ $reserva->servicio->nombre }}</td>
                                <td>{{ $reserva->fecha }}</td>
                                <td>{{ ucfirst($reserva->estado) }}</td>
                                <td>
                                    <form method="POST" action="{{ route('reservas.destroy', $reserva) }}">
                                        @csrf @method('DELETE')
                                        <button type="submit" class="btn btn-danger btn-small">Cancelar</button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                @else
                    <p>No tenés reservas.</p>
                @endif
            </div>
            <div id="seccion-editar" style="display:none;">
                <h3>Editar Perfil</h3>
                <form method="POST" action="{{ route('perfil.update') }}">
                    @csrf @method('PUT')
                    <div class="form-group">
                        <label>Nombre</label>
                        <input type="text" name="name" value="{{ old('name', $user->name) }}" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value="{{ old('email', $user->email) }}" required>
                    </div>
                    <div class="form-group">
                        <label>Teléfono</label>
                        <input type="text" name="telefono" value="{{ old('telefono', $user->telefono) }}">
                    </div>
                    <div class="form-group">
                        <label>Nueva contraseña (dejar vacío para no cambiar)</label>
                        <input type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label>Confirmar contraseña</label>
                        <input type="password" name="password_confirmation">
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar cambios</button>
                </form>
            </div>
        </div>
    </div>
</section>
@endsection

@push('scripts')
<script>
    document.querySelectorAll('.profile-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const seccion = link.dataset.seccion;
            document.getElementById('seccion-reservas').style.display = seccion === 'reservas' ? 'block' : 'none';
            document.getElementById('seccion-editar').style.display = seccion === 'editar' ? 'block' : 'none';
        });
    });
</script>
@endpush
