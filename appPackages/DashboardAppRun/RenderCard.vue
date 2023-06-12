<template>
  <div class="render-item-wrap">
    <header class="top-title">
      <span>{{ title }}</span>
      <div class="img-btn-svg" @click="openDialog">
        <icon-svg
          :name="icons[5]"
        />
      </div>
    </header>
    <component
      :is="resolveComponentType(config.type)"
      :id="`${config.code}`"
      :ref="config.code"
      :key="config.key"
      :config="config"
    />
    <van-dialog
      v-model="formVisible"
      width="100%"
      :closeOnClickOverlay="true"
      :show-confirm-button="false"
    >
      <div ref="dialogBox" class="dialog-box" style="width: 100vh;height: 100vh">
        <component
          style="width: 100%;height: 100%"
          :is="resolveComponentType(config.type)"
          :id="`${config.code}${config.key}`"
          :ref="config.code"
          :key="config.key + 'dialog'"
          :config="config"
          :isDialog="isDialog"
        />
      </div>
    </van-dialog>
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
  import VanDialog  from 'vant/lib/dialog';
  import 'vant/lib/dialog/style';
  import Vue from 'vue'
  Vue.use(VanDialog)
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
    IconSvg
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
      isLandscape:true,
      isDialog:true,
      formVisible:false,
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
    fn(){
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
      // 应用旋转效果
      this.$nextTick(()=>{
        this.$refs.dialogBox.style.transform = 'rotate(-90deg)';
      })

    },
    resolveComponentType,
    openDialog(){
      this.formVisible = true
      this.fn()
    },
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
    background-color: var(--db-background-1);

    .top-title {
      color: var(--db-el-title);
      padding: 8px 8px 8px 0;
      line-height: 20px;
      border-bottom: 1px solid #f5f5f5;
      font-size: 14px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      span {
        display: inline-block;
        border-left: 3px solid var(--db-el-color-primary);
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
    /*.dialog-box{*/
    /*  position: fixed;*/
    /*  top: 0;*/
    /*  left: 0;*/
    /*  transform: rotate(90deg);*/
    /*  width: 100vw;*/
    /*}*/
    .landscape{
      -moz-transform:rotate(-90deg);
      -webkit-transform:rotate(-90deg);

    }
    .landscape{
      /*transform: rotateY(180deg);*/
    }
  }
</style>
