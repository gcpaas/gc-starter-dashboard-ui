<template>
  <div class="db-design-wrap db-picture">
    <div class="content-box">
      <van-image
        :src="config.customize.url || noImageUrl"
        fit="fill"
        :radius="config.customize.radius"
        :style="{
          width: '100%',
          height: '100%',
          opacity: config.customize.opacity / 100
        }"
        draggable="false"
      >
        <div
          slot="placeholder"
          class="image-slot"
        >
          加载中···
        </div>
      </van-image>
    </div>
  </div>
</template>
<script>
import VanImage from 'vant/lib/image';
import 'vant/lib/image/style';
import Vue from 'vue'
Vue.use(VanImage)
export default {
  name: 'PictureChart',
  components: {VanImage},
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      noImageUrl: require('packages/BasicComponents/Picture/images/noImage.png')
    }
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.db-design-wrap {
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  .content-box {
    width: 100%;
    height: 100%;
  }
}
</style>
