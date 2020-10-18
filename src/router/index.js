import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/',
    // 如果父路由又默认子路由，那么name就没有意义
    // name: 'LayoutIndex',
    component: () => import('@/views/layout'),
    children: [
      {
        // 默认子路由只能有一个
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      { path: '/wenda', name: 'wenda', component: () => import('@/views/wenda') },
      {
        path: '/shipin',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
