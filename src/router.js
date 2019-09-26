import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/Welcome.vue'
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
    component: Home,
    children: [
      {
        name: 'Welcome',
        path: 'welcome',
        component: Welcome
      }
    ]
  }
  ]
})

export default router
