<template>
  <div>
    <!--
      示例
      {
        label: '会员性别',
        content: '男',
        radios: [{
            label: '男'
        },
        {
            label: '女'
        }],
        prop: 'radio'  是否需要校验的时候用 参考http://element-cn.eleme.io/#/zh-CN/component/form
      }
      -->
    <el-form-item
      :label="radios.label"
      :prop="radios.prop"
      :label-width="Default(radios.labelwidth, '100px')">
      <el-radio-group
        :disabled="radios.disable"
        v-model="radios.content">
        <el-radio
          v-for="(radio, index) in radios.radios"
          :key="index"
          :label="radio.label">
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Radio',
  data() {
    return {
      Default: this.$tools.setDefault
    };
  },
  props: {
    radios: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
