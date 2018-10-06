<template>
  <div class="main-Wrapper">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div class="splite" style="height:50px" v-if="show"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" :to="{name: 'menu'}">主页</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" :to="{name: 'category'}">分类</van-tabbar-item>
      <van-tabbar-item icon="cart" :to="{name: 'cart'}" :info="info === 0 ? '' : info">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{name: 'member'}">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tabbar, TabbarItem } from 'vant';
import { mapGetters } from 'vuex';
import Logger from 'chivy';
const log = new Logger('views/main');
export default {
  name: 'Tian-Main',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  computed: {
    ...mapGetters([
      'info'
    ]),
    show() {
      return this.$tools.isIPhone();
    }
  },
  data() {
    return {
      active: 0
    };
  },
  mounted() {
    this.Selected();
  },
  methods: {
    // 根据路由代码激活当前选中图标
    Selected() {
      switch (this.$route.path) {
        case '/menu':
          this.active = 0;
          break;
        case '/cart':
          this.active = 2;
          break;
        case '/active':
          this.active = 1;
          break;
        case '/member':
          this.active = 3;
          break;
        case '/login':
          this.active = 3;
          break;
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../styles/mixin.styl'
.main-Wrapper
  height 100%
  bgcolor()
  .splite
    background-color rgb(244,244,244)
</style>
