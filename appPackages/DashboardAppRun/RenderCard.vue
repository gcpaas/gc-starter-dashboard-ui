<template>
  <div class="render-item-wrap">
    <header class="top-title">
      <span>{{ title }}</span>
      <icon-svg
        :name="icons[5]"
        class="img-btn-svg"
      />
    </header>
    <component
      :is="resolveComponentType(config.type)"
      :id="`${config.code}`"
      :ref="config.code"
      :key="config.key"
      :config="config"
    />
  </div>
</template>
<script>
  import { resolveComponentType } from 'packages/js/utils'
  import pcComponent from 'packages/js/utils/appComponentImport'
  import { dataInit, destroyedEvent } from 'packages/js/utils/eventBus'
  import CustomComponent from 'packages/PlotRender/index.vue'
  import Svgs from 'packages/Svgs/index.vue'
  import RemoteComponent from 'packages/RemoteComponents/index.vue'
  import commonMixins from "packages/js/mixins/commonMixins";
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
    ...components,
    CustomComponent,
    Svgs,
    RemoteComponent,
    IconSvg,
  },
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title () {
      return this.config.title
    }
  },
  data() {
    return {
      icons:Icon.getNameList()
    }
  },
  beforeDestroy () {
    destroyedEvent()
  },
  mounted() {
    // 调用初始化方法
    dataInit(this)
  },
  methods: {
    resolveComponentType,
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
