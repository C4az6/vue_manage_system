import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import router from '@/router.js'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
