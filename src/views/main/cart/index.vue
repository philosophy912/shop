<template>
  <div class="cart-Wrapper">
    <div class="cart" v-if="selectFoods.length !== 0">
      <div class="banner van-hairline--bottom">
        <span @click="onClickModifySwitch">{{editText}}</span>
      </div>
      <van-checkbox-group v-model="result">
        <van-cell title="Tian Bakery" icon="shop"/>
        <div class="order" v-for="(product, index) in selectFoods" :key="index">
          <good :lazy="false" showcheckbox :good="product" :edit="!edit"></good>
        </div>
      </van-checkbox-group>
      <div class="submit">
        <van-submit-bar
          :button-text="opsText"
          :disabled="disable"
          :price="price"
          @submit="onSubmit">
          <van-checkbox class="checkbox" v-model="checked" @change="onClickSelectAllCheckbox">全选</van-checkbox>
        </van-submit-bar> 
      </div>
    </div>
    <div class="nocart" v-else>
      <div class="text">
        <div class="title">购物车快饿瘪了~~</div>
        <div class="subtitle">请购买商品</div>
        <div class="search">
          <van-button type="default" size="small" @click="jump2MenuPage">去逛逛</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Checkbox, CheckboxGroup, Cell, SubmitBar, Button } from 'vant';
import { mapGetters } from 'vuex';
import good from '@/components/good';
// import Logger from 'chivy';
// const log = new Logger('views/main/cart');
export default {
  name: 'Tian-Cart',
  components: {
    good,
    [Cell.name]: Cell,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [SubmitBar.name]: SubmitBar,
    [Button.name]: Button
  },
  activated() {
    this.SelectFoodIds()
  },
  mounted() {
    this.edit = false;
  },
  data() {
    return {
      show: false,
      edit: false,
      checked: true,
      result: []
    };
  },
  computed: {
    ...mapGetters([
      'selectFoods',
    ]),
    // 普通价格
    price() {
      let price = 0;
      this.selectFoods.forEach(food => {
        price += food.price * food.count;
      })
      return price * 100;
    },
    opsText() {
      return this.edit ? '删除' : '结算';
    },
    editText() {
      return this.edit ? '完成' : '编辑';
    },
    disable() {
      return this.result.length === 0 && this.opsText === '结算' ? true : false;
    },
    ischecked() {
      return this.result.length === this.selectFoods.length ? true : false;
    }
  },
  methods: {
    onClickModifySwitch() {
      this.edit = !this.edit;
    },
    onSubmit() {
      if (this.edit) {
        // 删除
        this.$store.commit('clearCarts');
      } else {
        // 结算
        const goods = this.SelectedFoods();
        this.$store.dispatch('setCartsgoods', goods).then(() => {
          this.$router.push({name: 'order'});
        });
      }
    },
    jump2MenuPage() {
      this.$router.push({name: 'menu'});
    },
    onClickSelectAllCheckbox() {
      this.checked ? this.SelectFoodIds : this.result = [];
    },
    // 购物车的IDs，用于选择返回
    SelectFoodIds() {
      this.result = [];
      this.selectFoods.forEach(good => {
        this.result.push(good.id);
      });
    },
    // 计算选中的商品
    SelectedFoods() {
      const paygoods = [];
      this.selectFoods.forEach(good => {
        this.result.forEach(id => {
          if (id === good.id) {
            paygoods.push(good);
          }
        })
      });
      return paygoods;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../styles/mixin.styl';
.cart-Wrapper
  background-color rgb(244, 244, 244)
  width 100%
  .cart
    .banner
      background-color rgb(255,255,255)
      display flex
      .title
        display inline-flex
        align-items center
        padding 10px 10px 10px 25px
      span
        font-size 16px
        line-height 30px
        margin-left auto
        margin-right 10px
    .van-checkbox-group
      margin-bottom 100px
      .order
        margin-top 5px
    .submit
      .van-submit-bar
        margin-bottom 50px
      .checkbox
        padding 15px 15px 15px 25px
  .nocart
    .text
      width 100%
      height 100%
      padding 50% 0px
      .title
        font-size 20px
        text-align center
        padding 10px 0px
      .subtitle
        font-size 16px
        text-align center
        padding 5px 0px
        gray-color()
      .search
        margin 15px 0px
        display flex
        justify-content center
        align-items center
        .van-button
          border 1px solid rgb(255, 97, 25)
          price-color()
</style>
