<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="w-full max-w-md space-y-8 p-8 rounded-3xl border border-white/10 bg-white/5 shadow-soft backdrop-blur-xl">
      <div class="space-y-4 text-center">
        <h2 class="text-center text-2xl font-bold text-slate-100">
          Iniciar sesión
        </h2>
        <p class="text-center text-slate-400">
          Accedé a tu cuenta de Nanu
        </p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            class="block w-full rounded-3xl border border-white/10 bg-[#111113] px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            v-model="email"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            class="block w-full rounded-3xl border border-white/10 bg-[#111113] px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            v-model="password"
          />
        </div>
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 rounded-3xl text-sm font-semibold text-white bg-primary hover:bg-[#6B21A8] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>
        </div>
        <p class="text-center text-sm text-slate-500">
          ¿No tenés una cuenta?
          <router-link to="/register" class="font-semibold text-secondary hover:text-accent transition">
            Registrate
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const timeoutId = setTimeout(() => {
    if (loading.value) {
      loading.value = false
      toast.error('Tiempo de espera agotado. Revisa tu conexión.')
    }
  }, 10000)

  try {
    await authStore.login(email.value, password.value)
    clearTimeout(timeoutId)
    toast.success('Inicio de sesión exitoso')
    router.push('/')
  } catch (error) {
    clearTimeout(timeoutId)
    toast.error(error.message || 'Error al iniciar sesión')
  } finally {
    loading.value = false
  }
}
</script>