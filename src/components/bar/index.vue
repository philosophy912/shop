<template>
  <div class="bar-Wrapper">
    <van-icon
      v-if="show"
      class="nav"
      @click="jump2Category"
      size="32px"
      color="gray"
      name="wap-nav" />
    <van-field
      clearable
      :border="false"
      left-icon="search"
      v-model="value" 
      placeholder="请输入商品名称" />
    <van-icon
      class="contact"
      @click="jump2Login"
      size="20px"
      color="gray"
      name="contact" />
  </div>
</template>

<script type="text/ecmascript=6">
import { Field, Icon } from 'vant';
import Logger from 'chivy';
const log = new Logger('components/bar');
export default {
  name: 'Tian-Bar',
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon
  },
  data() {
    return {
      value: ''
    };
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    jump2Category() {
      log.info('jump to category page');
      this.$router.push({name: 'test', params: {id: 256}});
    },
    jump2Login() {
      log.info('jump to login page');
      this.$router.push({name: 'login'});
    }
  }
};

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.bar-Wrapper
  background-color rgb(244, 244, 244)
  display flex
  flex-wrap nowrap
  .nav
    padding 6px
  .contact
    padding 10px
</style>
