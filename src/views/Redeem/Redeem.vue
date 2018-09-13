<template>
  <div class='MemberListTest'>
    <page
      ref="page"
      @redeem="redeem"
      @confirm="confirm"
      :tabbar="tabbar"
      :table="table"
      :dialog="dialog"
      :url="url">
      <it :input='dialog.form.name'></it>
      <it :input='dialog.form.point'></it>
      <it :input='dialog.form.memberName'></it>
      <inr :inputNumber='dialog.form.redeemCount'></inr>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import inr from '@/components/inputNumber';
import { isNameValid, isIntegerValid } from '@/utils/validate';
import { executeRedeem } from '@/api/bonuspoints';
import Logger from 'chivy';
const log = new Logger('views/Categorys');
export default {
  name: 'Redeem',
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
          {prop: 'name', label: '名称', width: "120", fixed: true},
          {prop: 'classify', label: '分类', width: "120"},
          {prop: 'point', label: '兑换积分', width: "120"},
          {prop: 'price', label: '价格', width: "60"},
          {prop: 'memberPrice', label: '会员价格', width: "90"},
          {prop: 'imageUrl', label: '图片'}
        ],
        opsbtns: [
          {type: 'primary',  text: '兑换', ops: 'redeem'}
        ]
      },
      url: {
        data: '/member/bonuspoints/ui/getProducts.do',
        page: '/member/bonuspoints/ui/getExchangeProductPage.do'
      },
      dialog: {
        title: '兑换商品',
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
            label: '兑换商品',
            content: '',
            disable: false,
            must: true,
            prop: 'name'
          },
          point: {
            label: '可兑换积分',
            content: '',
            disable: false,
            must: true,
            prop: 'point'
          },
          memberName: {
            label: '会员账号',
            content: '',
            placeholder: '请输入账号/手机/邮件',
            disable: true,
            must: false,
            prop: 'memberName'
          },
          redeemCount: {
            label: '兑换数量',
            content: 1,
            min: 1,
            max: 10
          },
          id: ''
        },
        // 校验部分的设置pop名字和formitem必须一致
        rules: {
          name: [
            { required: true, validator: isNameValid, trigger: 'blur' }
          ],
          // TODO 暂时只校验正整数
          point: [
            { required: true, validator: isIntegerValid, trigger: 'blur'}
          ],
          // TODO 暂时只校验正整数
          memberName: [
            { required: true, validator: isNameValid, trigger: 'blur'}
          ]
        }
      }
    };
  },
  methods: {
    redeem(data) {
      this._showDialog(data);
    },
    confirm() {
      executeRedeem(this._setParam()).then(response => {
        this.$message.success('商品兑换成功');
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
        point: this.dialog.form.point.content,
        memberName: this.dialog.form.memberName.content,
        count: this.dialog.form.redeemCount.content
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
