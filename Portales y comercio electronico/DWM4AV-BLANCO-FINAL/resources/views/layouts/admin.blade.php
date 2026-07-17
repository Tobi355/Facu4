<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Panel Administrador')</title>
    <link rel="icon" href="{{ asset('storage/logo.png') }}" type="image/png">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <link rel="stylesheet" href="{{ asset('css/hero-enhanced.css') }}">
    @stack('styles')
</head>
<body>
    @include('partials.navbar')

    <div class="admin-container">
        <aside class="admin-sidebar">
            <nav>
                <ul class="admin-menu">
                    <li><a href="{{ route('admin.dashboard') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">Dashboard</a></li>
                    <li><a href="{{ route('admin.servicios.index') }}" class="{{ request()->routeIs('admin.servicios.*') ? 'active' : '' }}">Servicios</a></li>
                    <li><a href="{{ route('admin.categorias.index') }}" class="{{ request()->routeIs('admin.categorias.*') ? 'active' : '' }}">Categorías</a></li>
                    <li><a href="{{ route('admin.usuarios') }}" class="{{ request()->routeIs('admin.usuarios*') ? 'active' : '' }}">Usuarios</a></li>
                    <li><a href="{{ route('admin.reservas') }}" class="{{ request()->routeIs('admin.reservas') ? 'active' : '' }}">Reservas</a></li>
                    <li><a href="{{ route('admin.contactos') }}" class="{{ request()->routeIs('admin.contactos') ? 'active' : '' }}">Contactos</a></li>
                    <li><a href="{{ route('admin.orders.index') }}" class="{{ request()->routeIs('admin.orders.*') ? 'active' : '' }}">Órdenes</a></li>
                </ul>
            </nav>
        </aside>

        <div class="admin-main">
            <main class="admin-content">
                @yield('content')
            </main>
        </div>
    </div>

    @include('partials.footer')

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="{{ asset('js/site.js') }}"></script>
    <script src="{{ asset('js/hero3d.js') }}"></script>
    <script src="{{ asset('js/ui.js') }}"></script>
    <script src="{{ asset('js/admin-reservas.js') }}"></script>
    @stack('scripts')
</body>
</html>
