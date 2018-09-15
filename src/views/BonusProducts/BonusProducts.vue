<template>
  <div class='MemberListTest' >
    <el-tabs
      @tab-click="handleClick"
      v-model="active"
      tab-position="left">
      <el-tab-pane label="所有商品" name="all">
        <Products ref="all"></Products>
      </el-tab-pane>
      <el-tab-pane label="积分商品" name="bonus">
        <BonusProduct ref="bonus"></BonusProduct>
      </el-tab-pane>
      <el-tab-pane label=" 兑换商品" name="echange">
        <BonusExchange ref="exchange"></BonusExchange>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type='text/ecmascript=6'>
import Products from './Products/index';
import BonusProduct from './BonusProducts/index';
import BonusExchange from './BonusExchange/index';
import Logger from 'chivy';
const log = new Logger('views/BonusProducts');
export default {
  name: 'BonusProducts',
  components: {
    Products,
    BonusProduct,
    BonusExchange
  },
  data() {
    return {
      active: 'all'
    };
  },
  methods: {
    handleClick() {
      log.info(this.active);
      if (this.active === 'all') {
        this.$refs.all.refreshData();
      } else if (this.active === 'bonus') {
        this.$refs.bonus.refreshData();
      } else if (this.active === "exchange") {
        this.$refs.bonus.refreshData();
      }
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
