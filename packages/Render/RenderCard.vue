<!--
 * @description: 渲染组件
 * @Date: 2022-08-18 09:42:45
 * @Author: xingheng
-->

<template>
  <div class="render-item-wrap">
    <header class="top-title">
      <span>{{ title }}</span>
      <icon-svg
        :name="icons[5]"
        class="img-btn-svg"
      />
    </header>
    <div class="render-item-wrap-inner">
      <component
        :is="resolveComponentType(config.type)"
        :id="`${config.code}`"
        :ref="config.code"
        :key="config.key"
        :config="config"
      />
    </div>
  </div>
</template>
<script>
import commonMixins from 'packages/js/mixins/commonMixins'
import { mapMutations } from 'vuex'
import { resolveComponentType } from 'packages/js/utils'
import pcComponent from 'packages/js/utils/componentImport'
import { dataInit, destroyedEvent } from 'packages/js/utils/eventBus'
import CustomComponent from '../PlotRender/index.vue'
import Svgs from '../Svgs/index.vue'
import RemoteComponent from 'packages/RemoteComponents/index.vue'
import IconSvg from 'packages/SvgIcon'
import Icon from 'packages/assets/images/pageIcon/export'
const components = {}
for (const key in pcComponent) {
  if (Object.hasOwnProperty.call(pcComponent, key)) {
    components[key] = pcComponent[key]
  }
}
export default {
  name: 'RenderCard',
  mixins: [commonMixins],
  components: {
    IconSvg,
    ...components,
    CustomComponent,
    Svgs,
    RemoteComponent
  },
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({})
    },
    ruleKey: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      icons: Icon.getNameList()
    }
  },
  computed: {
    title () {
      return this.config.title
    }
  },
  mounted () {
    // 调用初始化方法
    dataInit(this)
    // if (this.config.dataSource.businessKey) {
    //   setInterval(() => {
    //     console.log('刷新', this.config.key)
    //     this.refresh(this.config)
    //   }, 5000)
    // }
  },
  beforeDestroy () {
    destroyedEvent()
  },
  methods: {
    ...mapMutations('dashboard', [
      'changeChartConfig'
    ]),
    resolveComponentType,
    // 刷新
    refresh (config) {
      // const filterList = []
      // const params = {
      //   chart: {
      //     ...config,
      //     option: undefined
      //   },
      //   current: 1,
      //   pageCode: this.pageCode,
      //   type: config.type,
      //   filterList
      // }
      // getUpdateChartInfo(params).then((res) => {
      //   console.log(res)
      //   // 获取数据后更新组件配置
      //   config.key = new Date().getTime()
      //   this.changeChartConfig(config)
      //   // this.$message.success('更新成功')
      // }).catch((err) => {
      //   console.error(err)
      //   // this.$message.error('更新失败')
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.render-item-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-color: var(--ds-background-1);

  .top-title {
    color: var(--ds-el-title);
    padding: 8px 8px 8px 0;
    line-height: 20px;
    border-bottom: 1px solid #f5f5f5;
    font-size: 14px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      border-left: 3px solid var(--ds-el-color-primary);
      padding-left: 16px;
    }
  }
  .render-item-wrap-inner {
    flex: 1;
    height: calc(100% - 40px);
    position: relative;
  }
  .img-btn-svg{
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
