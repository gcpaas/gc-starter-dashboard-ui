/*
 * @description: 案例和打包加载不同配置
 * @Author: xing.heng
 */

const isExample = process.env.VUE_APP_BUILD_TYPE === 'example'
const isPackage = process.env.VUE_APP_BUILD_TYPE === 'package'
const isAppPackage = process.env.VUE_APP_BUILD_TYPE === 'appPackage'
module.exports = isExample
  ? require('./vue.config.example')
  : require('./vue.config.package')

if (isExample) {
  module.exports = require('./vue.config.example')
}

if (isPackage) {
  module.exports = require('./vue.config.package')
}

if (isAppPackage) {
  module.exports = require('./vue.config.appPackage')
}
