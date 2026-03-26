import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import PublicChat from '../pages/PublicChat.vue'
import CrearCuenta from '../pages/CrearCuenta.vue'
import Ingresar from '../pages/Ingresar.vue'

const routes = [
    {path : '/', name: 'Home', component: Home},
    {path : '/chat', name: 'Public Chat', component: PublicChat},
    {path : '/crear-cuenta', name: 'Crear Cuenta', component: CrearCuenta},
    {path : '/ingresar', name: 'Ingresar', component: Ingresar},
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;