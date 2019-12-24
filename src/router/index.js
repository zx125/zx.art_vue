import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import PaySuccess from '../views/PaySuccess.vue'
import Blog from '../views/Blog.vue'
import Club from '../views/Club.vue'
import PaySuccess_Club from '../views/PaySuccess_club.vue'
import Art from '../views/Art.vue'

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
        path: '/pay/success_club',
        name: 'PaySuccessClub',
        component: PaySuccess_Club
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/club/:pk',
        name: 'Club',
        component: Club
    },
    {
        path: '/art/:pk',
        name: 'Art',
        component: Art
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
