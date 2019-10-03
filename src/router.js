import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/Welcome.vue'
import User from '@/views/users/User.vue'
import Rights from '@/views/rights/Rights.vue'
import Roles from '@/views/rights/Roles.vue'
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
      },
      {
        name: 'User',
        path: 'users',
        component: User
      },
      {
        name: 'Rights',
        path: 'rights',
        component: Rights
      },
      {
        name: 'Roles',
        path: 'roles',
        component: Roles
      }
    ]
  }
  ]
})

export default router
