<template>
  <div class='MemberListTest'>
    <page
      ref="page"
      @changePwd="changePwd"
      @confirm="confirm"
      :tabbar="tabbar"
      :table="table"
      :dialog="dialog"
      :url="url">
      <it :input="dialog.form.name" ></it>
      <it :input="dialog.form.pwd"></it>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import { isPwdValid } from '@/utils/validate';
import { modifyPassword } from '@/api/member';
import Logger from 'chivy';
const log = new Logger('views/Categorys');
export default {
  name: 'Recharge',
  components: {
    page,
    it
  },
  data() {
    return {
      tabbar: {
        placeholder: '',
        opsbtns: [
          {text: '查找', ops: 'find'}
        ]
      },
      table: {
        columns: [
          {prop: 'name', label: '账号', width: '100',fixed: true},
          {prop: 'valid', label: '激活状态', width: '120'}
        ],
        opsbtns: [
          {type: 'primary',  text: '修改密码', ops: 'changePwd'}
        ]
      },
      url: {
        data: '/member/show/ui/getMember.do',
        page: '/member/show/ui/getMemberPage.do'
      },
      dialog: {
        title: '修改会员密码',
        visible: false,
        action: 'confirm',
        footer: {
          left: {
              text: '确认'
          },
          right: {
              text: '取消'
          }
        },
        form: {
          name: {
            label: '用户账号',
            content: '',
            disable: true,
            must: true,
            prop: 'name'
          },
          pwd: {
            label: '会员密码',
            content: '',
            placeholder: '请输入新密码',
            disable: false,
            type: 'password',
            must: true,
            prop: 'pwd'
          },
          id: ''
        },
        // 校验部分的设置pop名字和formitem必须一致
        rules: {
          pwd: [
            { required: true, validator: isPwdValid, trigger: 'blur'}
          ]
        }
      }
    };
  },
  methods: {
    changePwd(data) {
      this._showDialog(data);
    },
    confirm() {
      modifyPassword(this._setParam()).then(response => {
        this.$message.success('会员[' + this.dialog.form.name.content + ']密码修改成功');
      });
      this.$refs.page.setDialogVisable(false);
      this.$refs.page.refreshData();
    },
    _showDialog(payload) {
      this._setFormValue(payload.row);
      this.$refs.page.setDialogVisable(true);
    },
    // 新增和修改的参数 新增为true， 修改为false
    _setParam() {
      return {
        entityId: this.dialog.form.id,
        entityName: this.dialog.form.pwd.content
      };
    },
    // 设置Form参数
    _setFormValue(row) {
      log.debug(JSON.stringify(row));
      this.dialog.form.name.content = row.name;
      this.dialog.form.id = row.id;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
