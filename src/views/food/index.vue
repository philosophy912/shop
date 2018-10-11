<template>
  <div class="food-Wrapper">
    <div class="content" v-if="good">
      <van-nav-bar
        title="商品详情"
        left-arrow
        @click-left="back">
      </van-nav-bar>
      <van-swipe :autoplay="3000" class="swiper">
        <van-swipe-item v-for="(image, index) in sliders(good.imageUrl)" :key="index">
          <img :src="image.url" width="100%" height="auto"/>
        </van-swipe-item>
      </van-swipe>
      <!-- TODO 需要根据当前状态返回价格 -->
      <item :name="good.name" :price="good.price"></item>
      <div class="desc">{{good.description}}</div>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="wap-home" text="主页" :to="{name: 'menu'}"></van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" text="购物车" :to="{name: 'cart'}" :info="info"></van-goods-action-mini-btn>
      <van-goods-action-big-btn text="加入购物车" @click="add2cart"></van-goods-action-big-btn>
      <van-goods-action-big-btn text="立即购买" primary @click="buyit" ></van-goods-action-big-btn>
    </van-goods-action>
    <sku ref="sku"></sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Swipe, SwipeItem, NavBar } from 'vant';
import { mapGetters, mapState } from 'vuex';
import item from '@/components/list/';
import sku from '@/components/sku';
import Logger from 'chivy';
const log = new Logger('views/food');
export default {
   name: 'Tian-Food',
  data() {
    return {
      to: '',
    }
  },
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NavBar.name]: NavBar,
    sku,
    item
  },
  /* props: {
    good: {
      type: Object
    }
  }, */
  beforeRouteEnter(to, from, next) {
    next(vm => {
      log.debug('beforeRouteEnter to path is ' + to.path);
      // 保存这个路由是从那个地方来的
      vm.to = from.path;
      const params = window.location.href.split('/');
      const id = params[params.length - 1];
      const entityID = {entityId: id};
      vm.$store.dispatch('getGood', entityID);
    });
  },
  computed: {
    ...mapState({
      'good': state => state.product.good
    }),
    ...mapGetters([
      'selectFoods'
    ]),
    info() {
      if (this.$tools.isZero(this.selectFoods.length)) {
        return '';
      } else {
        let result = 0;
        this.selectFoods.forEach(good => {
          result += good.count;
        });
        return result;
      }
    },
    url() {
      if (this.$tools.isEqual(this.to, '/menu')) {
        return true;
      } else if (this.$tools.isEqual(this.to, '/category')) {
        return false;
      } else {
        return null;
      }
    }
  },
  methods: {
    sliders(images) {
      const imageList = images.split(';');
      const result = [];
      imageList.forEach(image => {
        result.push({url: this.$tools.resizeImage(image, 400)})
      });
      log.debug('silders is ' + JSON.stringify(result));
      return result;
    },
    back() {
      this.$tools.isEmpty(this.url) ? this.$router.push({name : 'menu'}) : this.$router.push({path: this.to});
    },
    add2cart() {
      this.$refs.sku.NextOrConfirmShow(this.good, false);
    },
    buyit() {
      this.$refs.sku.NextOrConfirmShow(this.good, true);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../styles/mixin.styl'
.food-Wrapper
  background-color rgb(244, 244, 244)
  margin-bottom 50px
  .content
    .van-nav-bar
      position fixed
      left 0px
      top 0px
      width 100%
    .swiper
      margin-top 46px
    .desc
      text-indent 32px
      font-size 16px
      line-height 1.5
      margin 8px 0
      padding 0px 5px
</style>
