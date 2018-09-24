<template>
 <div class="table-wrapper">
   <el-container>
     <el-header>
      <hd
        @operation="tabbarOps"
        :placeholder="tabbarPlaceholder"
        :opsbtns="tabbarOpsbtns">
      </hd>
     </el-header>
     <el-main>
      <mn
        @format="format"
        @operations="mainOps"
        :data="data"
        :columns="mainColumns"
        :opsbtns="mainOpsbtns">
      </mn>
     </el-main>
     <ft
        @sizeChange="sizeChange"
        @currentChange="currentChange"
        :total="total"
        :pagecount="pagecount"
        :pagesize="pagesize"
        :currentpage="currentpage"
        :showPagination="showPagination">
      </ft>
   </el-container>
 </div>
</template>

<script>
import hd from './header';
import mn from './main';
import ft from './footer';
import service from '@/utils/request';
import Logger from 'chivy';
const log = new Logger('components/table');
export default {
  name: 'Table',
  data() {
    return {
      showPagination: true,
      data: [],
      currentpage: 1,
      pagesize: 10,
      total: 0,
      pagecount: 1
    };
  },
  props: {
    tabbarPlaceholder: {
      type: String
    },
    tabbarOpsbtns: {
      type: Array
    },
    mainColumns: {
      type: Array
    },
    // 有默认值，可以不传
    mainOpsbtns: {
      type: Array
    },
    // 数据请求地址和分页请求地址
    url: {
      type: Object
    },
    // post请求数据
    request: {
      type: Object
    }
  },
  mounted() {
    /*eslint-disable*/
    // debugger
    if (this.$tools.isEmpty(this.url.page)) {
      this.showPagination = false;
    }
    // 获取数据
    this.GetDataAndPages(this.request);
  },
  components: {
    hd,
    mn,
    ft
  },
  methods: {
    format(data) {
      return data.cellValue;
      // this.$emit('format', data);
    },
    sizeChange(val) {
      this.request.envData.pageSize = val;
      this.GetDataAndPages(this.request);
    },
    currentChange(val) {
      this.request.envData.pageNo = val;
      this.GetDataAndPages(this.request);
    },
    tabbarOps(data) {
      log.debug('tabbarOps');
      log.debug('ops type is ' + JSON.stringify(data));
      // page页面来实现
      this.$emit(data.ops, data.input);
    },
    mainOps(data) {
      log.debug('mainOps');
      log.debug('data is ' + JSON.stringify(data));
      // page页面来实现
      const index = data.index;
      log.debug('index is ' + JSON.stringify(index));
      const row = data.row;
      log.debug('row is ' + JSON.stringify(row));
      if (data.ops === 'detail' || data.ops === 'modify' || data.ops === 'delete') {
        this.$emit(data.ops, {index, row});
      } else {
        this.$emit('operation', data);
      }
    },
    // 根据url以及相应的数据来获取数据并格式化表格
    GetDataAndPages(param) {
      return new Promise((resolve, reject) => {
        if (this.showPagination) {
          Promise.all([service({url: this.url.data, method: 'post', data: param}), service({url: this.url.page, method: 'post', data: param})]).then(resp => {
            const data = resp[0];
            if (Array.isArray(data)) {
              this.data = data;
            } else {
              this.data = [data];
            }
            this.currentpage = param.envData.pageNo;
            this.pagesize = param.envData.pageSize;
            this.total = resp[1].envData.totalRows;
            this.pagecount = resp[1].envData.totalPages;
            resolve();
          });
        } else {
          // 如果page没有则只需要更新数据部分
          service({url: this.url.data, method: 'post', data: param}).then(resp => {
            this.data = resp;
            resolve();
          })
        }
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.table-wrapper
  flex 1
  width 100%
  height 100%
  .el-main
    margin 0px
    padding 5px
  .el-header
    margin-top 20px        
  .el-footer
    overflow hidden
    width 100%
</style>
