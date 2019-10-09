// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './icons' // icon
import '@/styles/index.scss' // global css
import './permission' // permission control
// import './directive/permission' // permission control

import permission from '@/directive/permission/index.js' // 权限判断指令

Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.directive('permission', permission)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
