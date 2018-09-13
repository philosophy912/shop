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
      <it :input='dialog.form.level'></it>
      <it :input='dialog.form.discount'></it>
      <it :input='dialog.form.desc'></it>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import { isNameValid, isDiscountValid } from '@/utils/validate';
import { createMemberGrade, updateMemberGrade, deleteMemberGrade } from '@/api/member';
import Logger from 'chivy';
const log = new Logger('views/Categorys');
export default {
  name: 'MemberGrade',
  components: {
    page,
    it
  },
  data() {
    return {
      tabbar: {
        placeholder: '名称/手机号/邮箱',
        opsbtns: [
          {text: '查找', ops: 'find'},
          {type: 'success', text: '添加', ops: 'add'}
        ]
      },
      table: {
        columns: [
          {prop: 'name', label: '名称', width: "100", fixed: true},
          {prop: 'discount', label: '折扣', width: "100"},
          {prop: 'mobile', label: '描述'},
          {prop: 'createTimeAsString', label: '创建时间', width: "180"},
        ]
      },
      url: {
        data: '/member/show/ui/getMemberGrades.do'
        // page: '/member/show/ui/getMemberPage.do'
      },
      dialog: {
        addTitle: '新增级别',
        detailTitle: '级别详情',
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
          level: {
            label: '级别名称',
            content: '',
            placeholder: '请输入级别名称',
            disable: false,
            must: true,
            prop: 'level'
          },
          discount: {
            label: '折扣',
            content: '',
            placeholder: '请输入折扣',
            disable: false,
            must: true,
            prop: 'discount'
          },
          desc: {
            label: '级别描述',
            content: '',
            type: 'textarea',
            rows: 6,
            placeholder: '请输入描述内容',
            disable: false,
          },
          id: ''
        },
        // 校验部分的设置pop名字和formitem必须一致
        rules: {
          level: [
            { required: true, validator: isNameValid, trigger: 'blur' }
          ],
          discount: [
            { required: true, validator: isDiscountValid, trigger: 'blur'}
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
      deleteMemberGrade(data).then(resp => {
        this.$message.success('删除会员级别成功');
        this.$refs.page.refreshData();
      }).catch(error => {
        log.error(JSON.stringify(error));
        this.$message.error('删除会员级别失败');
      });
    },
    actionModify() {
      log.debug('update data is ' + JSON.stringify(this._setParam(false)));
      updateMemberGrade(this._setParam(false)).then(resp => {
        this.$message.success('修改会员级别成功');
        this.$refs.page.refreshData();;
      }).catch(error => {
        log.error(JSON.stringify(error));
        this.$message.error('修改会员级别失败');
      });
      this.$refs.page.setDialogVisable(false);
    },
    actionAdd() {
      log.info('add ops');
      createMemberGrade(this._setParam(true)).then(resp => {
        this.$message.success('添加会员级别成功');
        this.$refs.page.refreshData();
      }).catch(error => {
        log.error(JSON.stringify(error));
        this.$message.error('添加会员级别失败');
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
        name: this.dialog.form.level.content,
        discount: this.dialog.form.discount.content,
        description: this.dialog.form.desc.content
      };
      if (!flag){
        param.id = this.dialog.form.id;
      }
      return param;
    },
    // 设置Form参数
    _setFormValue(row) {
      this.dialog.form.level.content = row.name;
      this.dialog.form.discount.content = row.discount;
      this.dialog.form.desc.content = row.description;
      this.dialog.form.id = row.id;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
