<template>
  <div class="menu-Wrapper">
    <bar></bar>
    <van-swipe :autoplay="3000" class="swiper">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" width="100%" height="auto"/>
      </van-swipe-item>
    </van-swipe>
    <category :categorys="categorys"></category>
    <banner
      title="热销单品"
      subtitle="Hot-Sale Product">
    </banner>
    <div class="product-images">
      <ul class="iamge" v-for="(image, index) in sliders" :key="index">
        <li>
          <img :src="Resize(image.imageUrl)" />
          <div>{{image.name}}</div>
        </li>
      </ul>
    </div>
    <banner
      title="精选推荐"
      subtitle="Selection Recommendation">
    </banner>
    <div class="food-item" v-for="(good, index) in sliders" :key="index">
      <good :showcheckbox="false" :good="good" :nameSize="20" :priceSize="24">
        <template slot="right-bottom">
          <van-button class="button" type="warning" size="small" @click.native.stop.prevent="onBuyClicked(good)">购买</van-button>
        </template>
      </good>
    </div>
    <sku ref="sku"></sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { Swipe, SwipeItem, Button } from 'vant';
import { mapGetters, mapState } from 'vuex';
import bar from '@/components/bar';
import category from '@/components/category';
import banner from '@/components/banner';
import good from '@/components/good';
import sku from '@/components/sku';
import Logger from 'chivy';
const log = new Logger('views/main/menu');
export default {
  name: 'Tian-Menu',
  components: {
    bar,
    category,
    banner,
    good,
    sku,
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$tools.isEmpty(vm.goods)) {
        this.$store.dispatch('getGoods');
      }
    })
  },
  data() {
    return {
      images: [
        '/upload/slider1.jpg',
        '/upload/slider2.jpg',
        '/upload/slider3.jpg',
        '/upload/slider4.jpg'
      ],
      categorys: [
        {'img': '/img/drink.png', 'name': '饮品'},
        {'img': '/img/cookies.png', 'name': '饼干'},
        {'img': '/img/cake.png', 'name': '蛋糕'},
        {'img': '/img/dessert.png', 'name': '甜品台'},
      ],
      Resize: this.$tools.getFirstImage
    };
  },
  computed: {
    ...mapGetters([
      'sliders'
    ]),
    ...mapState({
      'goods': state => state.product.goods
    })
  },
  methods: {
    onBuyClicked(product) {
      log.info('buy product');
      log.debug('product is ' + JSON.stringify(product));
      this.$refs.sku.SkuShow(product);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.menu-Wrapper
  width 100%
  .product-images
    display flex
    flex-wrap wrap
    ul  
      width 50%
      li
        padding 5px 10px
        text-align center
        img
          width 100%
          height 100%
        div
          padding 5px 0px
  .food-item
    padding 5px
    .button
      padding 0px
      font-size 14px
</style>
