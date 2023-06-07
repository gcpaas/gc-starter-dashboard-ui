import 'packages/assets/style/common/index.scss'
import 'packages/assets/style/bsTheme.scss'

// 渲染整个bigScreenApp的渲染引擎
import DashboardAppRun from 'app/DashboardAppRun'

// 仪表盘 vuex store数据
import dashboardAppStore from 'packages/js/store'
// 注册基础配置
import registerConfig from 'packages/js/utils/registerConfig'
// 更新主题
import updateTheme from 'packages/js/utils/updateTheme'

// 存储组件列表
const components = [
  DashboardAppRun
]

const $dashboardApp = {
  dashboardAppStore
}

function install (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export {
  install,
  DashboardAppRun,

  $dashboardApp,
  registerConfig,
  updateTheme
}

export default {
  install,
  DashboardAppRun,

  $dashboardApp,
  registerConfig,
  updateTheme
}
