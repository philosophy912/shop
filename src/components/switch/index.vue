<template>
  <div>
    <!--
      {
        label: '是否预定',
        disable: false,
        status: false
      }
      -->
    <el-form-item
      :label="swit.label"
      :label-width="Default(swit.labelwidth, '100px')">
      <el-switch
        v-model="swit.status"
        :disabled="swit.disable" >
      </el-switch>
    </el-form-item>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'B-switch',
  data() {
    return {
      Default: this.$tools.setDefault
    };
  },
  props: {
    swit: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
