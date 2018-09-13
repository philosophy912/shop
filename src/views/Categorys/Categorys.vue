<template>
  <div class='MemberListTest'>
    <page
      ref="page"
      @delete="actionDelete"
      @detail="detail"
      @modify="modify"
      @confirmModify="actionModify"
      @confirmAdd="actionAdd"
      :tabbar="tabbar"
      :table="table"
      :dialog="dialog"
      :url="url">
      <it :input="dialog.form.name"></it>
      <it :input="dialog.form.desc"></it>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import { isNameValid } from '@/utils/validate';
import { deleteCategory, updateCategory, createCategory } from '@/api/product';
import Logger from 'chivy';
const log = new Logger('views/Categorys');
export default {
  name: 'Categorys',
  components: {
    page,
    it
  },
  data() {
    return {
      tabbar: {
        placeholder: '',
        opsbtns: [
          {text: '查找', ops: 'find'},
          {type: 'success', text: '添加', ops: 'add'}
        ]
      },
      table: {
        columns: [
          {prop: 'name', label: '名称', width: "120"},
          {prop: 'description', label: '描述'},
          {prop: 'createTimeAsString', label: '创建时间', width: "180"}
        ]
      },
      url: {
        data: '/category/show/ui/getCategory.do',
        page: '/category/show/ui/getCategoryPage.do'
      },
      dialog: {
        addTitle: '新增分类',
        detailTitle: '分类详情',
        action: '',
        title: '',
        visible: false,
        footer: {
          left: {
              text: ''
          },
          right: {
              text: ''
          }
        },
        form: {
          name: {
            label: '分类名称',
            content: '',
            placeholder: '请输入分类名称',
            disable: false,
            must: true,
            prop: 'name'
          },
          desc: {
            label: '分类描述',
            content: '',
            type: 'textarea',
            placeholder: '请输入描述内容',
            disable: false
          },
          id: ''
        },
        // 校验部分的设置pop名字和formitem必须一致
        rules: {
          name: [
            { required: true, validator: isNameValid, trigger: 'blur' }
          ]
        }
      }
    };
  },
  methods: {
    // 会员详情
    detail(payload) {
      log.debug('detail payload is ' + JSON.stringify(payload));
      this._showDialog(payload);
    },
    // 修改会员
    modify(payload) {
      this._showDialog(payload);
    },
    actionDelete(row) {
      const data = {entityId: row.row.id};
      deleteCategory(data).then(resp => {
        this.$message.success('删除分类成功');
        this.$refs.page.refreshData();
      });
    },
    actionModify() {
      log.debug('update data is ' + JSON.stringify(this._setParam(false)));
      updateCategory(this._setParam(false)).then(resp => {
        this.$message.success('修改分类成功');
        this.$refs.page.refreshData();
      });
      this.$refs.page.setDialogVisable(false);
    },
    actionAdd() {
      log.info('add ops');
      createCategory(this._setParam(true)).then(resp => {
        this.$message.success('添加分类成功');
        this.$refs.page.refreshData();
      });
      this.$refs.page.setDialogVisable(false);
    },
    _showDialog(payload) {
      this._setFormValue(payload.row);
      this.$refs.page.setDialogVisable(true);
    },
    // 新增和修改的参数 新增为true， 修改为false
    _setParam(flag) {
      const param = {
        name: this.dialog.form.name.content,
        description: this.dialog.form.desc.content
      };
      if (!flag) {
        param.id = this.dialog.form.id;
      }
      return param;
    },
    // 设置Form参数
    _setFormValue(row) {
      this.dialog.form.name.content = row.name;
      this.dialog.form.desc.content = row.description;
      this.dialog.form.id = row.id;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
