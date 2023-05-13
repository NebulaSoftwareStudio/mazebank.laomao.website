import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/mazeBankLogin.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/mazeBankIndex.vue')
    },
    {
        path: '/deposit',
        name: 'deposit',
        component: () => import('../views/accountTransactionDeposit.vue')
    },
    {
        path: '/withdraw',
        name: 'withdraw',
        component: () => import('../views/accountTransactionWithdraw.vue')
    },
    {
        path: '/accountTransactionDetail',
        name: 'accountTransactionDetail',
        component: () => import('../views/accountTransactionDetail.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
