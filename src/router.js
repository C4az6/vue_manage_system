import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/Welcome.vue'
import User from '@/views/users/User.vue'
import Rights from '@/views/rights/Rights.vue'
import Roles from '@/views/rights/Roles.vue'
import Goods from '@/views/goods/Goods.vue'
import List from '@/views/goods/List.vue'
import Add from '@/views/goods/Add.vue'
import Edit from '@/views/goods/Edit.vue'
Vue.use(VueRouter)

// 创建路由模块
var router = new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'Login' }
    }, {
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
        },
        {
          name: 'Goods',
          path: 'goods',
          component: Goods,
          redirect: { name: 'List' },
          children: [
            {
              name: 'List',
              path: 'list',
              component: List
            },
            {
              name: 'Add',
              path: 'add',
              component: Add
            },
            {
              name: 'Edit',
              path: 'edit',
              component: Edit
            }
          ]
        }

      ]
    }
  ]
})

export default router
