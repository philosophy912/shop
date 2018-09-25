<template>
  <div class='TestPage'>
    <tb
      :tableData="tableData">
    </tb>
  </div>
</template>

<script type='text/ecmascript=6'>
import tb from './TestPage.vue';
import Logger from 'chivy';
const log = new Logger('views/TestPage');
export default {
  name: 'TestPage',
  components: {
    tb
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
