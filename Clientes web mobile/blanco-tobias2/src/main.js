import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import { supabase } from './supabase'

await supabase.auth.signOut()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 3,
  newestOnTop: true,
  timeout: 6000,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  hideProgressBar: false
})

app.mount('#app')

const authStore = useAuthStore()
authStore.initAuth()