<template>
  <div class="not-permission-wrap">
    访问无权限
  </div>
</template>
<script>
export default {
  name: 'NotPermission',
  props: {
  },
  components: {},
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "packages/assets/style/bsTheme";
  .not-permission-wrap {
    width: 100vw;
    height: 100vh;
    background-color: var(--ds-background-1);
    color: var(--ds-el-text);
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
