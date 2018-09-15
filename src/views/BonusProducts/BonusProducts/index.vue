<template>
  <div class='MemberListTest'>
    <page
      ref="page"
      @delete="actionDelete"
      @modify="modify"
      @confirmModify="actionModify"
      :tabbar="tabbar"
      :table="table"
      :dialog="dialog"
      :url="url">
      <it :input='dialog.form.name'></it>
      <it :input='dialog.form.point'></it>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import up from '@/components/upload';
import sw from '@/components/switch';
import { isNameValid, isIntegerValid } from '@/utils/validate';
import { saveProduct, deleteProduct } from '@/api/bonuspoints';
import Logger from 'chivy';
const log = new Logger('views/BonusProducts/BonusProducts');
export default {
  name: 'BonusProducts',
  components: {
    page,
    it,
    up,
    sw
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
          {prop: 'name', label: '名称', width: "200", fixed: true},
          {prop: 'classify', label: '分类', width: "100"},
          {prop: 'price', label: '商品价格', width: "100"},
          {prop: 'memberPrice', label: '会员价格', width: "100"},
          {prop: 'imageUrl', label: '商品图片',  width: "200"},
          {prop: 'point', label: '兑换点数',  width: "100"},
          {prop: 'set2Exchange', label: '可兑换',  width: "100"},
          {prop: 'createTime', label: '创建时间', width: "180"}
        ],
        opsbtns: [
          {type: 'primary',  text: '修改积分', ops: 'modify'},
          {type: 'danger', text: '取消兑换', ops: 'delete'}
        ]
      },
      url: {
        data: '/member/bonuspoints/ui/getProducts.do',
        page: '/member/bonuspoints/ui/getExchangeProductPage.do'
      },
      deltips: '是否取消该商品为兑换商品',
      dialog: {
        action: 'confirm',
        modifyTitle: '修改积分商品',
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
            label: '名称',
            content: '',
            disable: true,
            modify: false
          },
          point: {
            label: '兑换点数',
            content: '',
            disable: false,
            must: true,
            prop: 'point'
          },
          id: ''
        },
        // 校验部分的设置pop名字和formitem必须一致
        rules: {
          point: [
            { required: true, validator: isIntegerValid, trigger: 'blur' }
          ]
        }
      }
    };
  },
  methods: {
    refreshData() {
      this.$refs.page.refreshData();
    },
    // 修改会员
    modify(payload) {
      this._showDialog(payload);
    },
    actionDelete(row) {
      log.debug('row is ' + JSON.stringify(row));
      deleteProduct({entityId: row.row.productId}).then(resp => {
        this.$message.success('删除可兑换商品成功');
        this.$refs.page.refreshData();
      });
    },
    actionModify() {
      log.debug('update data is ' + JSON.stringify(this._setParam(false)));
      saveProduct(this._setParam(false)).then(resp => {
        this.$message.success('修改商品兑换积分成功');
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
        point: this.dialog.form.point.content,
      };
      if (!flag) {
        param.productId = this.dialog.form.id;
      }
      return param;
    },
    // 设置Form参数
    _setFormValue(row) {
      this.dialog.form.name.content = row.name;
      this.dialog.form.point.content = row.point;
      this.dialog.form.id = row.productId;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
