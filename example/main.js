import 'babel-polyfill'
import promise from 'es6-promise'

import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'
import store from './store'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss'
import { registerConfig } from 'gc-starter-dashboard-ui'
import remoteComponents from '@/remoteComponents/exports.js'
Vue.use(ElementUI, { size: 'mini' })

registerConfig(
  {
    routers: {
      pageManagementUrl: '/'
    },
    httpConfigs: {
      baseURL: window.CONFIG?.baseUrl
    },
    customTheme: {
      '--bs-background-1': '#151a26', // 整体背景色
      '--bs-background-2': '#232832', // 布局背景色
      '--bs-el-background-1': '#151A26', // 组件背景色，输入框...
      '--bs-el-background-2': '#35393F', // 组件背景色，按钮、分页、加载...
      '--bs-el-background-3': '#303640', // 组件背景色，表格头部、下拉框hover...
      '--bs-el-title': '#ffffff', // 标题字体颜色
      '--bs-el-text': '#ffffff', // 一般字体颜色
      '--bs-el-color-primary': '#409EFF', // elment-ui主题色，激活
      '--bs-el-border': 'transparent' // 边框颜色
    },
    customPlots: [],
    // 远程组件列表
    remoteComponents
  },
  router
)

promise.polyfill()
// 自定义指令
Vue.use(ElementUI, { size: 'mini' })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
