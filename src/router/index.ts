import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/get/:id',
        name: 'Get',
        component: () => import('../views/Get.vue'),
        props: true
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router
