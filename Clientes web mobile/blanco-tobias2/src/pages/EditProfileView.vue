<template>
  <div class="min-h-screen  py-10">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div class="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl">
        <div class="mb-6">
          <h1 class="text-3xl font-semibold text-slate-100">Editar perfil</h1>
          <p class="mt-2 text-sm text-slate-400">Ajustá tu presencia y deja tu marca en Nanu.</p>
        </div>

        <div v-if="loading" class="text-center py-12">
          <LoadingSpinner />
        </div>

        <ErrorBoundary v-else-if="error && !profile.username" :errorMessage="error" :retry="fetchProfile" />

        <div v-else>
          <form @submit.prevent="handleUpdateProfile" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-slate-300 mb-2">
            Nombre de usuario
          </label>
          <input
            id="username"
            type="text"
            required
            maxlength="30"
            minlength="3"
            class="block w-full rounded-3xl border border-white/10 bg-[#111113] px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            v-model="profile.username"
          />
          <p v-if="profile.username.length > 0" class="mt-1 text-sm text-gray-500 dark:text-gray-400 text-right">
            {{ profile.username.length }}/30
          </p>
        </div>

        <div>
          <label for="bio" class="block text-sm font-medium text-slate-300 mb-2">
            Biografía
          </label>
          <textarea
            id="bio"
            rows="4"
            class="block w-full rounded-3xl border border-white/10 bg-[#111113] px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            v-model="profile.bio"
            maxlength="160"
            placeholder="Contá algo sobre vos..."
          ></textarea>
          <p v-if="profile.bio && profile.bio.length > 0" class="mt-1 text-sm text-gray-500 dark:text-gray-400 text-right">
            {{ profile.bio.length }}/160
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">
            Avatar
          </label>
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img
              :src="avatarPreview || profile.avatar_url || avatarPlaceholder"
              :alt="profile.username"
              class="h-20 w-20 rounded-[1.25rem] border border-white/10 object-cover"
            />
            <div>
              <label for="avatar" class="cursor-pointer inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
                Cambiar foto
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                @change="handleAvatarChange"
                class="hidden"
              >
              <p v-if="selectedAvatar" class="mt-2 text-sm text-green-600 dark:text-green-400">
                ✓ {{ selectedAvatar.name }}
              </p>
              <p v-if="avatarError" class="mt-1 text-sm text-red-500 dark:text-red-400">
                {{ avatarError }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="text-sm font-medium text-secondary hover:text-accent transition"
          >
            {{ showPassword ? '▲ Ocultar' : '▼ Cambiar' }} contraseña
          </button>
        </div>

        <div v-if="showPassword" class="space-y-4 rounded-[1.5rem] border border-white/10 bg-[#111113] p-4">
          <div>
            <label for="newPassword" class="block text-sm font-medium text-slate-300 mb-2">
              Nueva contraseña
            </label>
            <input
              id="newPassword"
              type="password"
              minlength="6"
              class="block w-full rounded-3xl border border-white/10 bg-[#09090B] px-4 py-3 text-base text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              v-model="newPassword"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <button
            type="button"
            @click="handleChangePassword"
            :disabled="loadingSubmit || newPassword.length < 6"
            class="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#6B21A8] disabled:opacity-50 transition"
          >
            {{ loadingSubmit ? 'Actualizando...' : 'Actualizar contraseña' }}
          </button>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            @click="resetForm"
            class="rounded-full px-5 py-3 text-sm text-slate-300 hover:text-slate-100 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="loadingSubmit"
            class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-[#6B21A8] disabled:opacity-50 transition"
          >
            {{ loadingSubmit ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import avatarPlaceholder from '../assets/avatarPlaceHolder.png'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { profileService } from '../services/profileService'
import { storageService } from '../services/storageService'
import { supabase } from '../supabase'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorBoundary from '../components/ErrorBoundary.vue'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const profile = ref({ username: '', bio: '', avatar_url: null })
const selectedAvatar = ref(null)
const avatarPreview = ref(null)
const avatarError = ref(null)
const showPassword = ref(false)
const newPassword = ref('')

const loading = ref(false)
const error = ref(null)
const loadingSubmit = ref(false)

const fetchProfile = async () => {
  if (!authStore.user) {
    router.push('/login')
    return
  }
  loading.value = true
  error.value = null
  try {
    const data = await profileService.getProfileById(authStore.user.id)
    profile.value = {
      username: data.username ?? '',
      bio: data.bio ?? '',
      avatar_url: data.avatar_url ?? null
    }
  } catch (err) {
    error.value = err.message || 'Error al cargar el perfil'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}

const handleAvatarChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  avatarError.value = null

  if (!file.type.startsWith('image/')) {
    avatarError.value = 'Solo se permiten imágenes'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    avatarError.value = 'El archivo es demasiado grande (máximo 5MB)'
    return
  }

  selectedAvatar.value = file
  // Preview local inmediato
  avatarPreview.value = URL.createObjectURL(file)
}

const handleUpdateProfile = async () => {
  if (!profile.value.username.trim()) {
    toast.error('El nombre de usuario es requerido')
    return
  }
  if (profile.value.username.trim().length < 3) {
    toast.error('El nombre de usuario debe tener al menos 3 caracteres')
    return
  }
  if (profile.value.bio && profile.value.bio.length > 160) {
    toast.error('La biografía no puede exceder 160 caracteres')
    return
  }

  loadingSubmit.value = true
  error.value = null

  try {
    let avatarUrl = profile.value.avatar_url

    if (selectedAvatar.value) {
      avatarUrl = await storageService.uploadAvatar(selectedAvatar.value)
    }

    await profileService.updateProfile(authStore.user.id, {
      username: profile.value.username.trim(),
      bio: profile.value.bio?.trim() || null,
      avatar_url: avatarUrl
    })

    authStore.user = {
      ...authStore.user,
      username: profile.value.username.trim(),
      avatar_url: avatarUrl,
      bio: profile.value.bio?.trim() || null
    }

    selectedAvatar.value = null
    avatarPreview.value = null
    toast.success('Perfil actualizado correctamente')
  } catch (err) {
    error.value = err.message || 'Error al actualizar el perfil'
    toast.error(error.value)
  } finally {
    loadingSubmit.value = false
  }
}

const handleChangePassword = async () => {
  if (newPassword.value.length < 6) {
    toast.error('La contraseña debe tener al menos 6 caracteres')
    return
  }

  loadingSubmit.value = true
  try {
    const { error: pwError } = await supabase.auth.updateUser({
      password: newPassword.value
    })
    if (pwError) throw pwError

    toast.success('Contraseña actualizada correctamente')
    showPassword.value = false
    newPassword.value = ''
  } catch (err) {
    toast.error(err.message || 'Error al actualizar la contraseña')
  } finally {
    loadingSubmit.value = false
  }
}

const resetForm = () => {
  fetchProfile()
  selectedAvatar.value = null
  avatarPreview.value = null
  avatarError.value = null
  showPassword.value = false
  newPassword.value = ''
}

onMounted(() => {
  fetchProfile()
})
</script>
