<template>
  <div>
    <div>
    <!--
      {
        label: '会员账号',
        content: '',
        placeholder: '会员账号/手机/邮件',
        disable: false,
        prefixicon: 'el-icon-star-on',
        suffixicon: 'el-icon-star-on',
        prop: 'input'  是否需要校验的时候用 参考http://element-cn.eleme.io/#/zh-CN/component/form
      }
      -->
    <el-form-item
      :label="inputNumber.label"
      :prop="inputNumber.prop"
      :label-width="Default(inputNumber.labelwidth, '100px')">
      <el-input-number
        v-model="inputNumber.content"
        :size="inputNumber.size"
        :precision="inputNumber.precision"
        :min="Default(inputNumber.min, 1)"
        :max="Default(inputNumber.max, '')"
        :step="Default(inputNumber.step, 1)"
        :disabled="inputNumber.disable">
      </el-input-number>
    </el-form-item>
  </div>
  </div>
</template>

<script type="text/ecmascript=6">
export default {
  name: 'InputNumber',
  data() {
    return {
      Default: this.$tools.setDefault
    };
  },
  props: {
    inputNumber: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
