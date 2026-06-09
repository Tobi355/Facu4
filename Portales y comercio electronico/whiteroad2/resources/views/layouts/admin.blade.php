<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin - WhiteRoad')</title>
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    @stack('styles')
</head>

<body>
    <div class="admin-container">
        <aside class="admin-sidebar">
            <div class="logo">WR Admin</div>
            <nav>
                <ul class="admin-menu">
                    <li><a href="{{ route('admin.dashboard') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">Dashboard</a></li>
                    <li><a href="{{ route('admin.servicios.index') }}" class="{{ request()->routeIs('admin.servicios.*') ? 'active' : '' }}">Servicios</a></li>
                    <li><a href="{{ route('admin.categorias.index') }}" class="{{ request()->routeIs('admin.categorias.*') ? 'active' : '' }}">Categorías</a></li>
                    <li><a href="{{ route('admin.usuarios') }}" class="{{ request()->routeIs('admin.usuarios*') ? 'active' : '' }}">Usuarios</a></li>
                    <li><a href="{{ route('admin.reservas') }}" class="{{ request()->routeIs('admin.reservas') ? 'active' : '' }}">Reservas</a></li>
                    <li><a href="{{ route('admin.contactos') }}" class="{{ request()->routeIs('admin.contactos') ? 'active' : '' }}">Contactos</a></li>
                    <li><a href="{{ route('home') }}">Ver sitio</a></li>
                </ul>
            </nav>
        </aside>

        <div class="admin-main">
            <header class="admin-header">
                <h1>Panel Administrador</h1>
                <div class="admin-actions">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="btn btn-secondary">Cerrar sesión</button>
                    </form>
                </div>
            </header>

            <main class="admin-content">
                @yield('content')
            </main>
        </div>
    </div>

    <script src="{{ asset('js/site.js') }}"></script>
    @stack('scripts')
</body>

</html>
