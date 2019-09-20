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
        path: '/redirect'
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
  }
]

export default new Router({
  routes: constantRouterMap
})
