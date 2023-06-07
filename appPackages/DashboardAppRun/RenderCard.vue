<template>
  <div class="render-item-wrap">
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
  import pcComponent from 'packages/js/utils/componentImport'
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
  overflow: hidden;
}
</style>
