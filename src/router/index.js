import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import PaySuccess from '../views/PaySuccess.vue'
import Blog from '../views/Blog.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/shop',
        name: 'shop',
        component: Shop
    },
    {
        path: '/pay/success',
        name: 'PaySuccess',
        component: PaySuccess
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
