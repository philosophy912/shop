<template>
  <div class="good-Wrapper">
    <van-swipe-cell :right-width="rightwidth" :on-close="onClose">
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div class="title">
              <van-checkbox class="checkbox" v-if="showcheckbox" :name="good.id"></van-checkbox>
              <img v-lazy="Resize400(good.imageUrl)" style="height:100px;width:100px" v-if="lazy">
              <img :src="Resize400(good.imageUrl)" style="height:100px;width:100px" v-else>
              <div class="product">
                <div class="name" v-if="edit" :style="{fontSize: nameSize + 'px'}">{{name(good)}}</div>
                <van-stepper
                  v-else
                  @change="OnStepperChange"
                  integer
                  :max="1000"
                  v-model="value" >
                </van-stepper>
                <!-- TODO 需要修改为会员登录则显示会员价，非会员登录显示非会员价 -->
                <div class="price-number">
                  <span class="member" :style="{fontSize: priceSize + 'px'}" >￥{{price(good)}}</span>
                  <span class="slot">
                    <slot name="right-bottom">
                      <span class="number">x{{value}}</span>
                    </slot>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <span slot="right">删除</span>
    </van-swipe-cell>
  </div>
</template>

<script type="text/ecmascript=6">
import { Checkbox, Icon, Cell, CellGroup, SwipeCell, Stepper } from 'vant';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('components/good');
export default {
  name: 'Tian-Good',
  data() {
    return {
      value: this.good.count
    };
  },
  props: {
    lazy: {
      type: Boolean,
      default: true
    },
    showcheckbox: {
      type: Boolean,
      default: false
    },
    good: {
      type: Object
    },
    edit: {
      type: Boolean,
      default: true
    },
    nameSize: {
      type: Number,
      default: 12
    },
    priceSize: {
      type: Number,
      default: 14
    }
  },
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SwipeCell.name]: SwipeCell,
    [Checkbox.name]: Checkbox,
    [Stepper.name]: Stepper
  },
  computed: {
    ...mapState({
      'member': state => state.member.member

    }),
    rightwidth() {
      if (this.showcheckbox) {
        return 65;
      } else {
        return 0;
      }
    }
  },
  methods: {
    price(good) {
      // log.debug('[methods][price][good(' + JSON.stringify(good) + ')]');
      // 显示会员价
      if (this.$tools.isNotEmpty(this.member)) {
        return good.memberPrice;
      } else {
        return good.price ? good.price : good.amount;
      }
    },
    Resize400(image) {
      return this.$tools.resizeImage(this.$tools.getFirstImage(image), 400);
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'right':
          log.info('delete button clicked');
          this.good.count = 0
          this.$store.commit('SET_COUNT', this.good);
          break;
      }
    },
    OnStepperChange(value) {
      this.$store.commit('SET_COUNT', {good: this.good, count: this.value});
    },
    name(good) {
      return this.$tools.isNotEmpty(good.name) ? good.name : good.productName;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../styles/mixin.styl'
.good-Wrapper
  padding 0px
  .van-cell
    padding 5px
  .van-swipe-cell
    .van-swipe-cell__right
      border 1px solid red
      span
        color: #FFFFFF;
        font-size: 15px;
        width: 65px;
        height: 120px;
        display: inline-block;
        text-align: center;
        line-height: 100px;
        background-color: #F44;
    .title
      display flex
      height 100px
      align-items center
      .checkbox
        padding 40px 10px
      .product
        flex-grow 1
        height 100px
        display flex
        flex-direction column
        .name
          font-weight 900
          padding 5px
        .price-number
          margin auto 0px 5px 5px
          display flex
          price-color()
          .slot
            margin-left auto
            margin-right 2px
</style>
