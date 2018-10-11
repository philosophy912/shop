<template>
  <div class="list-Wrapper">
    <div class="title">{{name}}</div>
    <div class="info">
      <span class="price">
        <span class="normal" :style="{fontSize: fontSize + 'px'}">￥{{price}}</span>
      </span>
      <span class="operation">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
// import Logger from 'chivy';
// const log = new Logger('/');
export default {
  name: 'Tian-List',
  props: {
    name: {
      type: String
    },
    price: {
      type: Number,
      default: 0
    },
    fontSize: {
      type: Number,
      default: 18
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../styles/mixin.styl'
.list-Wrapper
  background-color white
  width 100%
  .title,.info
    display flex
    width 100%
    justify-content space-between
  .title
    font-size 16px
    line-height 16px
    padding 5px
  .info
    padding 5px
    display flex
    justify-content space-between
    .price
      padding-left 5px
      line-height 32px
      .normal,.member
        price-color()
        /* font-size 18px */
      .member
        padding-left 5px
        /* font-size 18px */
    .operation
      margin-left auto
      margin-right 5px
      display flex
      align-items center
</style>
