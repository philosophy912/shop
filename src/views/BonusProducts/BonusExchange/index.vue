<template>
  <div class='MemberListTest'>
    <page
      ref="page"
      @exchange="exchange"
      :tabbar="tabbar"
      :table="table"
      :dialog="dialog"
      :deltips="deltips"
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
const log = new Logger('views/BonusProducts/BonusExchange');
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
          {type: 'primary',  text: '兑换商品', ops: 'exchange'},
        ]
      },
      url: {
        data: '/member/bonuspoints/ui/getProducts.do',
        page: '/member/bonuspoints/ui/getExchangeProductPage.do'
      },
      deltips: '是否取消该商品为兑换商品',
      dialog: {
        action: 'confirm',
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
    exchange() {
      log.debug('exchange');
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
