import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/event/:id',
      name: 'eventSingle',
      component: () => import('../views/EventSingle.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/resetpwd',
      name: 'resetpwd',
      component: () => import('../views/ResetPwd.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/Signin.vue')
    },
    {
      path: '/resetsuccess',
      name: 'resetsuccess',
      component: () => import('../views/ResetSuccess.vue')
    },
    {
      path: '/pwdlink',
      name: 'pwdlink',
      component: () => import('../views/PwdLink.vue')
    },
    {
      path: '/signuplink',
      name: 'signuplink',
      component: () => import('../views/SignupLink.vue')
    }
  ]
})