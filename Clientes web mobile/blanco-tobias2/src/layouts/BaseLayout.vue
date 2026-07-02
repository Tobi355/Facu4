<template>
  <div class="min-h-screen flex flex-col  text-slate-100">
    <ThreeBackground />

    <header class="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl shadow-soft">
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
      >
        <div class="flex items-center space-x-2">
          <router-link
            to="/"
            class="text-xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Nanu
          </router-link>
          <span class="text-xs uppercase tracking-[0.3em] text-slate-500 hidden sm:inline-flex">Studio</span>
        </div>

        <div class="hidden md:flex space-x-4">
          <router-link
            to="/feed"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Feed
          </router-link>
        </div>

        <div class="flex items-center space-x-3">
          <div
            v-if="authStore.user"
            ref="dropdownRef"
            class="relative"
          >
            <img
              :src="authStore.user.avatar_url || 'avatarPlaceHolde.png'"
              alt="Avatar"
              class="h-8 w-8 rounded-full cursor-pointer object-cover border border-gray-300 dark:border-gray-600"
              @click.stop="toggleDropdown"
            />

            <div
              v-if="dropdownOpen"
              class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-[9999]"
            >
              <div class="p-4">
                <div class="flex items-center gap-3">
                  <img
                    :src="authStore.user.avatar_url || 'avatarPlaceHolde.png'"
                    alt="Avatar"
                    class="h-10 w-10 rounded-full object-cover"
                  />

                  <div class="overflow-hidden">
                    <p
                      class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate"
                    >
                      {{ authStore.user.username }}
                    </p>

                    <p
                      class="text-xs text-gray-500 dark:text-gray-400 truncate"
                    >
                      {{ authStore.user.email }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700"></div>

              <div class="py-2">
                <router-link
                  :to="`/profile/${authStore.user.username}`"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  @click="closeDropdown"
                >
                  Mi perfil
                </router-link>

                <router-link
                  to="/edit-profile"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  @click="closeDropdown"
                >
                  Editar perfil
                </router-link>

                <button
                  type="button"
                  class="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  @click="logout"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>

          <div v-else class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Iniciar sesión
            </router-link>

            <router-link
              to="/register"
              class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Registrate
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <div class="flex-1 flex">
      <main class="flex-1 w-full overflow-y-auto z-10">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import ThreeBackground from '../components/ThreeBackground.vue'
import avatarPlaceholder from '../assets/avatarPlaceHolder.png'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const logout = async () => {
  try {
    closeDropdown()

    await authStore.logout()

    toast.success('Sesión cerrada')

    router.push('/login')
  } catch (error) {
    console.error(error)
    toast.error('Error al cerrar sesión')
  }
}

const handleOutsideClick = (event) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    dropdownOpen.value = false
  }
}

let authListener = null

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)

  const { data } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (event === 'SIGNED_OUT') {
        authStore.user = null
      }

      if (
        event === 'SIGNED_IN' &&
        session?.user &&
        !authStore.user
      ) {
        await authStore.initAuth()
      }
    }
  )

  authListener = data
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)

  if (authListener?.subscription) {
    authListener.subscription.unsubscribe()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>