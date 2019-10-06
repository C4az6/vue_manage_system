import '@/styles/index.less'
import '@/assets/js/love.js'
import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import router from '@/router.js'
// 引入element-ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
// 引入自定义样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false
// 凡是路由请求都会经过这个前置导航守卫---中间件
router.beforeEach((to, from, next) => {
  // 判断是否有token,如果有，则继续，否则重定向到登录
  var token = localStorage.getItem('user_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next({ name: 'Login' })
  }
})
Vue.use(VueQuillEditor)
Vue.use(ElementUI)
new Vue({
  // 注册路由
  router,
  render: h => h(App)
}).$mount('#app')
