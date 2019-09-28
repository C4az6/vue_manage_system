import '@/styles/index.less'
import '@/assets/js/love.js'
import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import router from '@/router.js'
// 引入element-ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义样式
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  // 注册路由
  router,
  render: h => h(App)
}).$mount('#app')
