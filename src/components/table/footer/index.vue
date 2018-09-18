<template>
 <div class="table-footer-wrapper">
   <el-footer v-if="showPagination">
    <el-pagination v-if="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentpage"
        :page-count="pagecount"
        :prev-text="prev"
        :next-text="next"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="sizes, prev, pager, next, total, jumper, slot"
        :total="total">
      </el-pagination>
    </el-footer>
 </div>
</template>

<script>
export default {
  name: 'TableFooter',
  props: {
    pagination: {
      type: Object,
      default: () => {
        return {
          currentpage: 1,
          pagesize: 10,
          total: 1,
          pagecount: 1
        };
      }
    },
    currentpage: {
      type: Number,
      default: 1
    },
    pagecount: {
      type: Number,
      default: 1
    },
    prev: {
      type: String,
      default: '上一页'
    },
    next: {
      type: String,
      default: '下一页'
    },
    pagesizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100];
      }
    },
    pagesize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    sizeChange(val) {
      this.$emit('sizeChange', val);
    },
    currentChange(val) {
      this.$emit('currentChange', val);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 
</style>
