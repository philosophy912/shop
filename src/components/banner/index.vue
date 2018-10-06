<template>
  <div class="title-Wrapper">
    <div class="title">
      <span :style="{fontSize: titleSize}"> 一 {{title}} 一 </span>
    </div>
    <div class="subtitle" :style="{fontSize: subTitle}">{{subtitle}}</div>
  </div>
</template>

<script type="text/ecmascript=6">
// import Logger from 'chivy';
// const log = new Logger('components/banner');
export default {
  name: 'Tian-Banner',
  components: {
  },
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    titleSize: {
      type: String,
      default: '28px'
    },
    subTitle: {
      type: String,
      default: '12px'
    }
  },
  data() {
    return {
    };
  }
};

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.title-Wrapper
  // margin-top 1px
  background-color white
  padding 15px
  display flex
  flex-wrap wrap
  .title,.subtitle
    width 100%
    text-align center
  .subtitle
    padding-top 5px
    color gray
</style>
