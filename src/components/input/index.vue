<template>
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
      :label="input.label"
      :prop="input.prop"
      :label-width="Default(input.labelwidth, '100px')">
      <el-input
        :prefix-icon="Default(input.prefixicon, '')"
        :suffix-icon="Default(input.suffixicon, '')"
        v-model="input.content"
        @blur="blur"
        :minlength="Default(input.minlength, '')"
        :maxlength="Default(input.maxlength, '')"
        :type="Default(input.type, 'text')"
        :rows="Default(input.rows, 6)"
        :size="Default(input.size, '')"
        :clearable="Default(input.clearable, true)"
        :placeholder="input.placeholder"
        :disabled="input.disable">
      </el-input>
    </el-form-item>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Input',
  data() {
    return {
      Default: this.$tools.setDefault
    };
  },
  props: {
    input: {
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
