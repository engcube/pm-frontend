import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import './global'

// 开启debug模式
Vue.config.debug = true

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueCookie)

import login from './components/login.vue'
import register from './components/register.vue'
import page404 from './components/page404.vue'
import chat from './components/chat.vue'

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
      path: '/chat',
      component: chat
    },
    {
      path: '/*',
      component: page404
    }
  ]
})

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + global.SessionID)
  next()
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  var session = global.SessionID
  if (session === '') {
    session = VueCookie.get('session')
    global.SessionID = session
  }
  console.log(session)
  if (session == null || session === '') {
    if (to.path === '/login') {
      next()
    } else if (to.path === '/register') {
      next()
    } else {
      return next({path: '/login'})
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
