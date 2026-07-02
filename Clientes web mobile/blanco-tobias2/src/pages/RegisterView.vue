<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="w-full max-w-md space-y-8 p-8 rounded-3xl border border-white/10 bg-white/5 shadow-soft backdrop-blur-xl">
      <div class="space-y-4 text-center">
        <h2 class="text-center text-2xl font-bold text-slate-100">
          Registrate
        </h2>
        <p class="text-center text-slate-400">
          Únete a Nanu y comparte tu creatividad con la comunidad.
        </p>
      </div>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-slate-300 mb-2">
            Nombre de usuario
          </label>
          <input
            id="username"
            type="text"
            required
            maxlength="30"
            class="block w-full rounded-3xl border border-white/10 bg-[#111113] px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            v-model="username"
          />
          <p v-if="username.length > 0" class="mt-1 text-sm text-gray-500 dark:text-gray-400 text-right">
            {{ username.length }}/30
          </p>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-slate-300 mb-2">
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
          <label for="password" class="block text-sm font-medium text-slate-300 mb-2">
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
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {{ loading ? 'Registrando...' : 'Regístrate' }}
          </button>
        </div>
        <p class="text-center text-sm text-slate-500">
          ¿Ya tenés una cuenta?
          <router-link to="/login" class="font-semibold text-secondary hover:text-accent transition">
            Iniciá sesión
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

const username = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleRegister = async () => {
  if (!username.value.trim()) {
    toast.error('El nombre de usuario es requerido')
    return
  }

  if (username.value.length < 3) {
    toast.error('El nombre de usuario debe tener al menos 3 caracteres')
    return
  }

  loading.value = true
  try {
    await authStore.register(email.value, password.value, username.value.trim())
    toast.success('Registro exitoso. Por favor verifica tu correo electrónico.')
    router.push('/login')
  } catch (error) {
    toast.error(error.message || 'Error al registrar')
  } finally {
    loading.value = false
  }
}
</script>