import Vue from 'vue'
import App from './App.vue'
import router from './router'; 

Vue.config.productionTip = false

new Vue({
  name: 'root-r',
  router, // 注入router的实例
  render: h => h(App), // app => {tag: 'vue-component-3-app'}
}).$mount('#app')


// 两种模式的路由

// history模式 用于生产环境 （需要服务端或者nginx支持，否则已刷新就会404）
// hash模式 比较丑
