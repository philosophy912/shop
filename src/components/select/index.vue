<template>
  <div>
    <!--
      {
        label: '分    类',
        content: '',
        disable: false,
        options: [],
        prop: 'selects'  是否需要校验的时候用 参考http://element-cn.eleme.io/#/zh-CN/component/form
      }
      -->
    <el-form-item
      :label="selects.label"
      :prop="selects.prop"
      :label-width="Default(selects.labelwidth, '100px')">
      <el-select
        :disabled="selects.disable"
        v-model="selects.content"
        :placeholder="Default(selects.placeholder, placeholder)"
        @blur="blur">
        <el-option
          v-for="option in selects.options"
          :key="option.value"
          :label="option.label"
          :value="option.value">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Select',
  created() {
    if (this.selects.options.length > 0) {
      this.selects.options.content = this.selects.options[0].value;
    }
  },
  data() {
    return {
      Default: this.$tools.setDefault,
      placeholder: '请选择'
    };
  },
  props: {
    selects: {
      type: Object
    }
  },
  methods: {
    blur() {
      this.$emit('blur');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
