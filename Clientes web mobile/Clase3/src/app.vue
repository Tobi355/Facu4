<script>
import tailwind from '@tailwindcss/vite'

export default {
    name: 'App',
}
</script>

<template>
    <nav>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <RouterLink class="nav-link active" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/chat">Chat publico</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/crear-cuenta">Crear cuenta</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/ingresar">Ingresar</RouterLink>
            </li>
        </ul>
    </nav>
    <main class="container py-2">
        <h1>Welcome to My App you are in:</h1>
        <router-view></router-view>
    </main>
    <footer class="footer">
        <p>&copy; 2024 My App. All rights reserved.</p>
    </footer>
</template>