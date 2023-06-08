<template>
  <div class="render-item-wrap">
    <header class="top-title">
      <span>{{ title }}</span>
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
    RemoteComponent
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
      tables: 'tables'
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

    .top-title {
      color: var(--ds-el-title);
      padding: 10px 0;

      span {
        display: inline-block;
        border-left: 4px solid var(--ds-el-color-primary);
        padding-left: 16px;
      }
    }
  }
</style>
