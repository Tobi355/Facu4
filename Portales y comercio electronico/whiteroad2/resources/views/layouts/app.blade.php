<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'WhiteRoad')</title>
    <link rel="icon" href="{{ asset('images/logo.png') }}" type="image/png">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <link rel="stylesheet" href="{{ asset('css/hero-enhanced.css') }}">
    @stack('styles')
</head>
<body>
    @include('partials.navbar')
    <main>
        @yield('content')
    </main>
    @include('partials.footer')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="{{ asset('js/site.js') }}"></script>
    <script src="{{ asset('js/hero3d.js') }}"></script>
    <script src="{{ asset('js/ui.js') }}"></script>
    @stack('scripts')
</body>
</html>
