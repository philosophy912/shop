<template>
  <div class='MemberListTest'>
    <page
      ref="page"
      @recharge="recharge"
      @confirm="confirm"
      :tabbar="tabbar"
      :table="table"
      :dialog="dialog"
      :url="url">
      <it :input="dialog.form.name" ></it>
      <it :input="dialog.form.amount"></it>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import { isNameValid, isPriceValid } from '@/utils/validate';
import { rechargeBalance } from '@/api/member';
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
          {prop: 'balance', label: '余额', width: '60'},
          {prop: 'valid', label: '激活状态', width: '120'}
        ],
        opsbtns: [
          {type: 'primary',  text: '充值', ops: 'recharge'}
        ]
      },
      url: {
        data: '/member/show/ui/getMember.do',
        page: '/member/show/ui/getMemberPage.do'
      },
      dialog: {
        title: '会员充值',
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
          amount: {
            label: '充值金额',
            content: '',
            placeholder: '请输入金额',
            disable: false,
            must: true,
            prop: 'amount'
          },
          id: ''
        },
        // 校验部分的设置pop名字和formitem必须一致
        rules: {
          amount: [
            { required: true, validator: isPriceValid, trigger: 'blur'}
          ]
        }
      }
    };
  },
  methods: {
    recharge(data) {
      this._showDialog(data);
    },
    confirm() {
      rechargeBalance(this._setParam()).then(response => {
        this.$message.success('会员' + this.dialog.form.name.content + '充值成功');
        this.$refs.page.refreshData();
      });
      this.$refs.page.setDialogVisable(false);
    },
    _showDialog(payload) {
      this._setFormValue(payload.row);
      this.$refs.page.setDialogVisable(true);
    },
    // 新增和修改的参数 新增为true， 修改为false
    _setParam() {
      return {
        name: this.dialog.form.name.content,
        balance: this.dialog.form.amount.content
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
