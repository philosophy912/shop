<template>
  <div class="table-header-wrapper">
    <el-input
      v-model="input"
      :placeholder="placeholder"
      :clearable="clearable">
    </el-input>
    <el-button v-show="opsbtns.length > 0"
      v-for="(btn,index) in opsbtns"
      :key="index"
      :type="Default(btn.type, 'primary')"
      :size="Default(btn.size, 'mini')"
      @click = operation(btn.ops)>
      {{btn.text}}
    </el-button>
  </div>
</template>

<script type="text/ecmascript=6">
import Logger from 'chivy';
const log = new Logger('components/table/header');
export default {
  name: 'TableHeader',
  data() {
    return {
      Default: this.$tools.setDefault,
      input: ''
    };
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入查询名称'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    opsbtns: {
      type: Array,
      default: () => {
        return [{text: '查找', ops: 'find'}]
      }
    }
  },
  methods: {
    operation(ops) {
      log.debug('operation');
      log.debug('ops is ' + ops);
      const input = this.input;
      this.$emit('operation', {ops, input});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.table-header-wrapper
  display flex
  .el-input
    width 400px
  .el-button
    height 40px
    width 80px
    margin-left 5px
</style>
