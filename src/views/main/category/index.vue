<template>
  <div class="category-Wrapper">
    <bar :show="false"></bar>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li
              class="menu-item"
              ref="menuList"
              v-for="(item,index) in goods"
              :key="index"
              :class="{'current':currentIndex===index}"
              @click="selectMenu(index, $event)">
              <span class="text border-1px">{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li class="food-list" ref="foodList" v-for="(item,index) in goods" :key="index">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li class="food-item" v-for="(good, index) in item.list" :key="index">
                  <div class="product" @click="jump2FoodPage(good)">
                    <good :showcheckbox="false" :good="good">
                      <template slot="right-bottom">
                        <van-button class="button" type="warning" size="mini" @click.native.stop.prevent="onBuyClicked(good)">购买</van-button>
                      </template>
                    </good>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
    </div>
    <sku ref="sku"></sku>
  </div>
</template>

<script type="text/ecmascript=6">
import good from '@/components/good';
import bar from '@/components/bar';
import sku from '@/components/sku';
import BScroll from 'better-scroll';
import { Button } from 'vant';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('views/main/category');
export default {
  name: 'Tian-Category',
  components: {
    [Button.name]: Button,
    bar,
    sku,
    good
  },
  data() {
    return {
      // 右侧列表没一个大区块的高度
      listHeight: [],
      // 滚动的值
      scrollY: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$tools.isEmpty(vm.goods)) {
        this.$store.dispatch('getGoods');
      }
    })
  },
  created() {
    // 数据【完全获取】后再去初始化scroll和获取右边的没一个盒子的高度 无法滑动的话跟这个就有直接的关系
    this.$nextTick(() => {
      this._initScroll();
      this._calculateHeight();
    });
  },
  computed: {
    ...mapState({
      'goods': state => state.product.goods
    }),
    //获取滚动的值，赋值给scrollY。然后根据scrollY 和listHeight的高度区间做对比，拿到index
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      //这里是获取到每一个盒子的clientHeight的高度进行叠加，在push到一个数组里面。
      this.foodsScroll.on('scroll', pos => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _followScroll(index) {
      const menuList = this.$refs.menuList;
      const el = menuList[index];
      this.menuScroll.scrollToElement(el, 300, 0, -100);
    },
    //点击的时候去让右边的滚动到指定的位置。
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      const foodList = this.$refs.foodList;
      const el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    jump2FoodPage(good) {
      log.debug(JSON.stringify(good));
      this.$router.push({name: 'food', params: {good: product}});
    },
    onBuyClicked(good) {
      log.info('buy product');
      this.$refs.sku.SkuShow(good);
    }
  }
};

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.category-Wrapper
  .goods
    position absolute
    top 46px
    bottom 50px
    width 100%
    overflow hidden
    display flex
    .menu-wrapper
      flex 0 0 80px
      width 70px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 70px
        padding-left 5px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            &:after
              display: none
        .text
          display table-cell
          width 56px
          text-align center
          vertical-align middle
          position: relative
          &:after
            display: block
            position: absolute
            left: 0
            bottom: 0
            width: 100%
            border-top: 1px solid rgba(7, 17, 27, 0.1)
            content: ' '
          font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      padding-top 5px
      height 20px
      line-height 20px
      border-left 2px solid #d9dde1
      font-size 16px
      font-weight 700
      color: rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 5px
      position: relative
      &:after
        display: block
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        content: ' '
      &:last-child
        &:after
          display: none
        margin-bottom: 0
      .product
        width 100%
        .button
          font-size 12px
          color rgb(255, 255, 255)
</style>
