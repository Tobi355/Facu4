<header>
    <div class="header-container">
        <a href="{{ route('home') }}" class="logo">
            <div class="logo-icon">WR</div>
            <span class="logo-text">White<span>Road</span></span>
        </a>
        <div class="menu-toggle">
            <span></span><span></span><span></span>
        </div>
        <nav>
            <ul>
                <li><a href="{{ route('home') }}">Inicio</a></li>
                <li><a href="{{ route('servicios.index') }}">Servicios</a></li>
                <li><a href="{{ route('nosotros') }}">Nosotros</a></li>
                <li><a href="{{ route('contacto') }}">Contacto</a></li>
                @auth
                    @if(Auth::user()->role === 'admin')
                        <li class="nav-admin"><a href="{{ route('admin.dashboard') }}">Admin</a></li>
                    @endif
                    <li class="nav-user-container">
                        <button class="nav-user-btn" id="nav-user-toggle">
                            <span class="nav-user-avatar">{{ substr(Auth::user()->name, 0, 1) }}</span>
                            <span class="nav-user-name">{{ Auth::user()->name }}</span>
                            <span class="nav-user-arrow">▼</span>
                        </button>
                        <div class="nav-user-dropdown" id="nav-user-dropdown">
                            <a href="{{ route('perfil.index') }}">
                                <span class="dropdown-icon">👤</span>
                                <span>Mi Perfil</span>
                            </a>
                            <form method="POST" action="{{ route('logout') }}" style="display: inline;">
                                @csrf
                                <button type="submit" style="background: none; border: none; cursor: pointer; text-align: left; width: 100%; padding: 10px 15px;">
                                    <span class="dropdown-icon">🚪</span>
                                    <span>Cerrar Sesión</span>
                                </button>
                            </form>
                        </div>
                    </li>
                @else
                    <li class="nav-admin"><a href="{{ route('login') }}">Admin</a></li>
                    <li class="nav-user-container"><a href="{{ route('login') }}" class="nav-btn">Ingresar</a></li>
                @endauth
            </ul>
        </nav>
    </div>
</header>
