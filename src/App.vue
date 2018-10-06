<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script type="text/ecmascript=6">
import Logger from 'chivy';
const log = new Logger('views/App');
export default {
  name: 'Tian',
  created() {
    log.info('start init UUID');
    this.$store.dispatch('initUser');
    this.$store.dispatch('getGoods');
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#app
  width 100%
  height 100%
  overflow-x hidden
</style>

