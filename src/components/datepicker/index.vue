
<template>
  <div>
    <!--
      datepicker: {
        label: '会员生日',
        content: '',
        disable: false,
        prop: 'picker'  是否需要校验的时候用 参考http://element-cn.eleme.io/#/zh-CN/component/form
      },
      -->
    <el-form-item
      :label="datepicker.label"
      :label-width="Default(datepicker.labelwidth, '100px')"
      :prop="datepicker.prop">
      <el-date-picker
        v-model="datepicker.content"
        :format="Default(datepicker.format, 'yyyy 年 MM 月 dd 日')"
        :align="Default(datepicker.align, 'left')"
        :type="Default(datepicker.type, 'date')"
        :value-format="Default(datepicker.valueformat, 'yyyy-MM-dd')"
        :placeholder="Default(datepicker.placeholder, placeholder)">
      </el-date-picker>
    </el-form-item>
  </div>
</template>

<script type="text/ecmascript-6">
/* import Logger from 'chivy';
const log = new Logger('components/datepicker'); */
export default {
  name: 'DatePicker',
  data() {
    return {
      Default: this.$tools.setDefault,
      placeholder: '请选择日期'
    };
  },
  props: {
    datepicker: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
