
<template>
  <div class="dashboard-preview-wrap" v-resize="boxResize">
    <div class="app-wrap app-display-wrapper" id="app-box">
      <div class="app-container app-design-wrap">
        <DashboardAppRun/>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardAppRun from '../../appPackages/DashboardAppRun/index.vue'
  import {getThemeConfig} from "../js/api/bigScreenApi";
  import {G2} from "@antv/g2plot";
  import {mapActions, mapMutations, mapState} from "vuex";
  export default {
    name: 'appPreview',
    components: {
      DashboardAppRun
    },
    props: {},
    data() {
      return {
      }
    },
    directives:{
      resize: { // 指令的名称
        bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
          let width = '', height = '';
          function isReize() {
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
              binding.value({width:style.width,height:style.height});  // 关键(这传入的是函数,所以执行此函数)
            }
            width = style.width;
            height = style.height;
          }
          el.__vueSetInterval__ = setInterval(isReize, 300);
        },
        unbind(el) {
          clearInterval(el.__vueSetInterval__);
        }
      }
    },
    computed: {
      ...mapState({
        pageInfo: state => state.dashboard.pageInfo,
        pageConfig: state => state.dashboard.pageInfo.pageConfig,
        chartList: state => state.dashboard.pageInfo.chartList,
        stateFitMode: state => state.dashboard.pageInfo.pageConfig.fitMode,
        isInit: (state) => !state.dashboard.pageLoading
      }),
      pageCode() {
        return this.$route.query.code
      }
    },
    created() {
      this.init()
    },
    methods: {
      ...mapActions('dashboard', [
        'initLayout' // -> this.initLayout()
      ]),
      ...mapMutations('dashboard', [
        'changeLayout',
        'changePageLoading',
        'changePageConfig'
      ]),
      // 监听盒子的大小变化
      boxResize(data){
        let appDom = document.getElementById('app-box')
        appDom.style.height = parseInt(data.height )* 0.9 + 'px'
        appDom.style.width  =  parseInt(data.height ) * 0.9 * 0.47 + 'px'
      },
      init () {
        if (!this.pageCode) { return }
        this.changePageLoading(true)
        this.initLayout(this.pageCode).then(() => {
          const themeName = this.pageConfig.customTheme
          if (this.pageConfig.customTheme === 'custom') {
            getThemeConfig().then((res) => {
              // 初始化时如果就是自定义主题则统一注册
              const { registerTheme } = G2
              registerTheme(themeName, { ...res.chart })
              const pageConfig = this.pageConfig
              pageConfig.themeJson = res
              this.changePageConfig(pageConfig)
              this.styleSet()
              this.changePageLoading(false)
            })
          } else {
            this.changePageLoading(false)
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-preview-wrap {
    /*min-height: calc(100vh - 50px);*/
    height: 100vh;
    background-color: #f5f7fa;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  /*滚动条样式*/
  /deep/::-webkit-scrollbar {
    width: 6px;
    border-radius: 4px;
    /*height: 4px;*/
  }
  /deep/::-webkit-scrollbar-thumb {
    background: #dddddd !important;
    border-radius: 10px;
  }
  .app-display-wrapper {
    position: relative;
    // 水平垂直居中
    width: 366.318px;
    height: 779.4px;
    //height: 98%;
    // 固定宽高比
    //aspect-ratio: 1 / 2.1;
    // 设置最大最小宽高
    min-width: 200px;
    min-height: 420px;
    background: url(packages/DashboardDesign/images/iphone.png)  no-repeat center 0;
    background-size: 100% 100%;

    .app-design-wrap {
      // 缩放比例
      position: absolute;
      top: 4rem;
      left: 1.6rem;
      right: 1.6rem;
      bottom: 30px;
      overflow: auto;
      border-radius: 0 0 35px 35px;
    }
  }

</style>
