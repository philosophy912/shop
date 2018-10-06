<template>
  <div class="category-Wrapper">
    <div class="category" v-for="(category, index) in categorys" :key="index">
      <img :src="category.img">
      <span>{{category.name}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
// import Logger from 'chivy';
// const log = new Logger('/');
export default {
  name: 'Tian-Category',
  props: {
    categorys: {
      type: Array
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.category-Wrapper
  background-color white
  padding 10px
  display flex
  flex-wrap nowrap
  .category
    width 100%
    img,span
      display block
    img
      padding 5px
      margin 0 auto
    span
      padding 5pxw
      color gray
      text-align center
</style>
