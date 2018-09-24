<template>
  <div class="table-main-wrapper">
    <el-table
      :data="data"
      :stripe="stripe"
      :border="border"
      :resizable="resizable"
      style="width: 100%">
      <el-table-column
        v-for="(col, index) in columns"
        :key="index"
        :fixed="Default(col.fixed, true)"
        :prop="col.prop"
        :formatter="formatter"
        :align="Default(col.align, 'center')"
        :label="col.label"
        :width="Default(col.width, '120')">
      </el-table-column>
      <el-table-column v-if="opsbtns.length > 0"
        :label="Default(column.label, '操作')"
        :width="Default(column.width, '240')"
        :align="Default(column.align, 'center')"
        :fixed="Default(column.fixed, true)">
        <template slot-scope="scope">
          <el-button
            v-for="(btn, index) in opsbtns"
            :key="index"
            :type="Default(btn.type, 'primary')"
            :size="Default(btn.size, 'mini')"
            @click="operation(btn.ops, scope.$index, scope.row)"
            >
          {{btn.text}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript=6">
import Logger from 'chivy';
const log = new Logger('components/table/main');
export default {
  name: 'TableMain',
  data() {
    return {
      Default: this.$tools.setDefault
    };
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: true
    },
    // 表格的表头以及数据，必须传入
    columns: {
      type: Array
    },
    // 操作表头 有默认值，可以不传数据
    column: {
      type: Object,
      default: () => {
        return {};
      }
    },
    opsbtns: {
      type: Array,
      default: () => {
        return [
          {type: 'info',  text: '详情', ops: 'detail'},
          {type: 'primary', text: '修改', ops: 'modify'},
          {type: 'danger', text: '删除', ops: 'delete'}
        ]
      }
    }
  },
  methods: {
    operation(ops, index, row) {
      log.debug('ops is ' + ops);
      log.debug('index is ' + index);
      log.debug('row is ' + JSON.stringify(row));
      this.$emit('operations', {ops, index, row});
    },
    formatter(row, column, cellValue, index) {
      // 以传入的prop为名字，传出去进行校验
      // const data = {row, column, cellValue, index}
      // this.$emit('format', {row, column, cellValue, index});
      return this.$tools.formatit(row, column, cellValue);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.table-main-wrapper
  height 100%
</style>
