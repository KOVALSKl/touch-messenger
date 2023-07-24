// Composables
import { createRouter, createWebHistory } from 'vue-router'

//Dependencies
import Cookies from 'js-cookie'
import store from "@/store/store";


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'chats',
        name: 'Chats',
        component: () => import('@/views/Chats.vue')
      },
      {
        path: 'chats/:id',
        name: 'Chat',
        component: () => import('@/views/Chat.vue'),
      },
      {
        path: 'friends',
        name: 'Friends',
        component: () => import('@/views/Friends.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/Authorization.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/views/Registration.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
    let token = Cookies.get('auth_token')
    if (token) {
      if (!store.state.isLoggedIn)
        store.commit('changeUserStatus', true)
      return true
    }

    if (store.state.isLoggedIn)
      store.commit('changeUserStatus', false)
    switch (to.path) {
      case '/':
      case '/login':
      case '/signup':
        return true
      default:
        console.log(to.path)
        return '/login';
    }
})

export default router
