<template>
  <div
    style="width: 100%;height: 100%"
    class="bs-design-wrap"
  >
    <dv-scroll-ranking-board
      :key="updateKey"
      class="ranking-box"
      :class="{'light-theme':customTheme === 'light','auto-theme':customTheme =='auto','dark-theme':customTheme =='dark'}"
      :config="option"
    />
  </div>
</template>
<script>
import DvScrollRankingBoard from '@jiaminghi/data-view/lib/components/scrollRankingBoard/src/main.vue'
import '@jiaminghi/data-view/lib/components/scrollRankingBoard/src/main.css'
import { refreshComponentMixin } from 'packages/js/mixins/refreshComponent'
import commonMixins from 'packages/js/mixins/commonMixins'
import paramsMixins from 'packages/js/mixins/paramsMixins'
import linkageMixins from 'packages/js/mixins/linkageMixins'
export default {
  name: 'ScrollRankingBoard',
  components: {
    DvScrollRankingBoard
  },
  mixins: [refreshComponentMixin, paramsMixins, commonMixins, linkageMixins],
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },
  computed: {
    option () {
      return { ...this.config.customize, data: this.config.option.data }
    }
  },
  watch: {
  },
  mounted () {},
  methods: {
    buildOption (config, data) {
      const dataSourseList = []
      data.data.forEach(item => {
        dataSourseList.push({ name: item[config.dataSource.dimensionField || 'name'], value: item[config.dataSource.metricField || 'sum(num)'] })
      })
      config.option = {
        ...config.option,
        data: dataSourseList
      }
      return config
    }

  }
}
</script>

<style lang="scss" scoped>
  @import '~packages/assets/style/chartStyle.scss';
  .ranking-box{
    padding: 10px;
  }

</style>
