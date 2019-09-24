import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
Vue.use(VueRouter)

// 创建路由模块
var router = new VueRouter({
  routes: [{
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Home',
    path: '/home',
    component: Home
  }
  ]
})

export default router
