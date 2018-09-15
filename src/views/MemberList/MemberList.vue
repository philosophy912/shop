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
      <it :input='dialog.form.name'></it>
      <it :input='dialog.form.phone'></it>
      <it :input='dialog.form.email'></it>
      <it :input='dialog.form.nick'></it>
      <se :selects='dialog.form.selects'></se>
      <it :input='dialog.form.desc'></it>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import se from '@/components/select';
import up from '@/components/upload';
import sw from '@/components/switch';
import { isNameValid, isSelectValid, isMobileValid, isEmailValid } from '@/utils/validate';
import { getMemberGradesforSelect, createMember, updateMember, deleteMember } from '@/api/member';
import Logger from 'chivy';
const log = new Logger('views/Categorys');
export default {
  name: 'MemberList',
  components: {
    page,
    it,
    se,
    up,
    sw
  },
  created() {
    getMemberGradesforSelect().then(data => {
      this.dialog.form.selects.options = this.$tools.dealForSelect(data);
    });
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
          {prop: 'name', label: '账号', width: '150',fixed: true},
          {prop: 'nick', label: '昵称', width: '100'},
          {prop: 'mobile', label: '手机号码', width: '120'},
          {prop: 'email', label: '电子邮件', width: '200'},
          {prop: 'balance', label: '余额', width: '60'},
          {prop: 'valid', label: '是否激活', width: '120'},
          {prop: 'gradeName', label: '会员级别', width: '120'},
          {prop: 'createTime', label: '创建时间', width: '180'}
        ]
      },
      url: {
        data: '/member/show/ui/getMember.do',
        page: '/member/show/ui/getMemberPage.do'
      },
      dialog: {
        addTitle: '新增会员',
        detailTitle: '会员详情',
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
            label: '会员账号',
            content: '',
            placeholder: '请输入会员名称',
            disable: false,
            must: true,
            prop: 'name'
          },
          phone: {
            label: '手机号码',
            content: '',
            placeholder: '请输入手机号码',
            disable: false,
            must: true,
            prop: 'phone'
          },
          email: {
            label: '电子邮件',
            content: '',
            placeholder: '请输入邮箱地址',
            disable: false,
            must: false,
            prop: 'email'
          },
          nick: {
            label: '会员昵称',
            content: '',
            placeholder: '请输入会员昵称',
            disable: false,
            must: false,
            prop: 'nick'
          },
          selects: {
            label: '会员级别',
            content: '',
            placeholder: '请选择会员级别',
            disable: false,
            options: [],
            must: false,
            prop: 'selects'
          },
          desc: {
            label: '会员描述',
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
          name: [
            { required: true, validator: isNameValid, trigger: 'blur' }
          ],
          phone: [
            { required: true, validator: isMobileValid, trigger: 'blur'}
          ],
          email: [
            { required: false, validator: isEmailValid, trigger: 'blur'}
          ],
          nick: [
            { required: false, validator: isNameValid, trigger: 'blur' }
          ],
          selects: [
            { required: false, validator: isSelectValid, trigger: 'blur' }
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
      deleteMember(data).then(resp => {
        this.$message.success('删除会员成功');
        this.$refs.page.refreshData();
      });
    },
    actionModify() {
      log.debug('update data is ' + JSON.stringify(this._setParam(false)));
      updateMember(this._setParam(false)).then(resp => {
        this.$message.success('修改会员成功');
        this.$refs.page.refreshData();
      });
      this.$refs.page.setDialogVisable(false);
    },
    actionAdd() {
      log.info('add ops');
      createMember(this._setParam(true)).then(resp => {
        this.$message.success('添加会员成功');
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
        mobile: this.dialog.form.phone.content,
        email: this.dialog.form.email.content,
        nick: this.dialog.form.nick.content,
        gradeId: this.dialog.form.selects.content,
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
      this.dialog.form.phone.content = row.mobile;
      this.dialog.form.email.content = row.email;
      this.dialog.form.nick.content = row.nick;
      this.dialog.form.selects.content = row.gradeId;
      this.dialog.form.desc.content = row.description;
      this.dialog.form.id = row.id;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
