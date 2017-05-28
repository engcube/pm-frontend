import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 开启debug模式
Vue.config.debug = true

Vue.use(VueRouter)
Vue.use(VueResource)

import login from './components/login.vue'
import register from './components/register.vue'
import page404 from './components/page404.vue'

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/*',
      component: page404
    }
  ]
})

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
