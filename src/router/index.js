import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/layout'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/redirect',
    component: layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/index',
    component: () => import('@/views/index/index'),
    hidden: true
  },
  {
    path: '',
    component: layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  }
]
export const asyncRouterMap = []
export default new Router({
  routes: constantRouterMap
})
