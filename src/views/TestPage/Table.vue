<template>
  <div class="page">
    <el-table
      :data="data">
      <el-table-column
        v-for="(col, index) in columns"
        :key="index"
        :property="col.prop"
        align="center"
        :label="col.label"
        width="620">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
/* import Logger from 'chivy';
const log = new Logger('TestPage/Table'); */
export default {
  name: 'Table',
  data() {
    return {
      columns: [
        {prop: 'id', label: '编号'},
        {prop: 'name', label: '名字'},
        {prop: 'code', label: '编码'},
        {prop: 'description', label: '描述'},
        {prop: 'objClass', label: '类名'},
        {prop: 'createTimeAsString', label: '创建时间'}
      ]
    };
  },
  props: {
    data: {
      type: Array,
      default: []
    }/* ,
    columns: {
      type: Array,
      default: [
        {prop: 'id', label: '编号'},
        {prop: 'name', label: '名字'},
        {prop: 'code', label: '编码'},
        {prop: 'description', label: '描述'},
        {prop: 'objClass', label: '类名'},
        {prop: 'createTimeAsString', label: '创建时间'}
      ]
    } */
  }
};
</script>

<style scoped lang="stylus">
</style>
