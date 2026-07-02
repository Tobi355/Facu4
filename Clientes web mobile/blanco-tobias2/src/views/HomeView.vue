<template>
  <div class="flex items-center justify-center min-h-[70vh]">
    <div class="text-center px-4 py-16 rounded-[2rem] border border-white/10 bg-white/5 shadow-soft backdrop-blur-xl max-w-3xl mx-auto">
      <h2 class="text-4xl font-extrabold text-gray-100 mb-4">
        Descubrí Nanu
      </h2>
      <p class="text-lg text-slate-400 mb-8 max-w-md mx-auto">
        La comunidad premium para diseñadores y creadores. Comparte ideas, posts y proyectos con estilo.
      </p>
      <div class="flex flex-col gap-4 sm:flex-row justify-center">
        <router-link
          to="/register"
          class="px-7 py-3 rounded-full bg-primary text-white font-semibold text-lg hover:bg-[#6B21A8] transition"
        >
          Empezar ahora
        </router-link>
        <router-link
          to="/login"
          class="px-7 py-3 rounded-full border border-white/10 text-slate-100 hover:bg-white/5 transition font-semibold text-lg"
        >
          Iniciar sesión
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (authStore.user) {
    router.push('/feed')
  }
})
</script>
