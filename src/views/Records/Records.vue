<template>
  <div class='records-wrapper'>
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
      <se :selects="dialog.form.selects"></se>
      <it :input="dialog.form.price"></it>
      <it :input="dialog.form.memberprice"></it>
      <up :upload="dialog.form.image"></up>
      <up :upload="dialog.form.sliderimage"></up>
      <sw :swit="dialog.form.slider"></sw>
      <sw :swit="dialog.form.order"></sw>
      <sw :swit="dialog.form.enable"></sw>
      <it :input="dialog.form.period"></it>
      <it :input="dialog.form.desc"></it>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import se from '@/components/select';
import up from '@/components/upload';
import sw from '@/components/switch';
import { isNameValid, isPriceValid, isSelectValid } from '@/utils/validate';
import { getCategoryforSelect, createProducts, updateProducts, deleteProducts } from '@/api/product';
import Logger from 'chivy';
const log = new Logger('views/Categorys');
export default {
  name: 'Products',
  components: {
    page,
    it,
    se,
    up,
    sw
  },
  created() {
    getCategoryforSelect().then(data => {
      this.dialog.form.selects.options = this.$tools.dealForSelect(data);
    });
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
          {prop: 'id', label: '订单号', width: "80"},
          {prop: 'userName', label: '名称', width: "120"},
          {prop: 'amount', label: '订单总价', width: "120"},
          {prop: 'cashOrBalance', label: '付款类型', width: "120"},
          {prop: 'status', label: '订单状态', width: "90"},
          {prop: 'deliveryLocation', label: '寄送地址', width: "250"},
          {prop: 'deliveryMobile', label: '联系方式', width: "120"},
          {prop: 'deliveryType', label: '寄送方式', width: "120"},
          {prop: 'createTimeAsString', label: '创建时间', width: "180"}
        ]
      },
      url: {
        data: '/product/show/ui/getRecordList.do',
        page: '/product/show/ui/getRecordPage.do'
      },
      dialog: {
        addTitle: '新增商品',
        detailTitle: '商品详情',
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
            label: '商品名称',
            content: '',
            placeholder: '请输入商品名称',
            disable: false,
            must: true,
            prop: 'name'
          },
          selects: {
            label: '分类',
            content: '',
            placeholder: '请选择分类',
            disable: false,
            options: [],
            must: true,
            prop: 'selects'
          },
          price: {
            label: '价格',
            content: '',
            placeholder: '请输入商品价格',
            disable: false,
            must: true,
            prop: 'price'
          },
          memberprice: {
            label: '会员价格',
            content: '',
            placeholder: '请输入商品会员价格',
            disable: false,
            must: true,
            prop: 'memberprice'
          },
          image: {
            label: '图片',
            limit: 10,
            disable: false,
            action: '/shop/category/show/ui/UpLoadProductImage.do',
            filelist: [],
            visable: false,
            url: ''
          },
          sliderimage: {
            label: '轮播图',
            limit: 1,
            disable: false,
            action: '/shop/category/show/ui/UpLoadProductImage.do',
            filelist: [],
            visable: false,
            // 预览图的地址
            url: ''
          },
          slider: {
            label: '是否轮播',
            disable: false,
            status: false
          },
          order: {
            label: '是否预定',
            disable: false,
            status: false
          },
          enable: {
            label: '是否上架',
            disable: false,
            status: false
          },
          period: {
            label: '生产周期',
            content: '',
            clearable: true,
            placeholder: '请输入生产周期',
            disable: false,
          },
          desc: {
            label: '商品描述',
            content: '',
            type: 'textarea',
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
          selects: [
            { required: true, validator: isSelectValid, trigger: 'blur' }
          ],
          price: [
            { required: true, validator: isPriceValid, trigger: 'blur' }
          ],
          memberprice: [
            { required: true, validator: isPriceValid, trigger: 'blur' }
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
      deleteProducts(data).then(resp => {
        this.$message.success('删除商品成功');
        this.$refs.page.refreshData();
      });
    },
    actionModify() {
      log.debug('update data is ' + JSON.stringify(this._setParam(false)));
      updateProducts(this._setParam(false)).then(resp => {
        this.$message.success('修改商品成功');
        this.$refs.page.refreshData();
      });
      this.$refs.page.setDialogVisable(false);
    },
    actionAdd() {
      log.info('add ops');
      createProducts(this._setParam(true)).then(resp => {
        this.$message.success('添加商品成功');
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
        classifyId: this.dialog.form.selects.content,
        price: this.dialog.form.price.content,
        memberPrice: this.dialog.form.memberprice.content,
        imageUrl: this.$tools.url2Str(this.dialog.form.image.filelist),
        imageSliderUrl: this.$tools.url2Str(this.dialog.form.sliderimage.filelist),
        slider: this.dialog.form.slider.status,
        canBook: this.dialog.form.order.status,
        enable: this.dialog.form.enable.status,
        creatPeriod: this.dialog.form.period.content,
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
      this.dialog.form.selects.content = row.classifyId;
      this.dialog.form.price.content = row.price;
      this.dialog.form.memberprice.content = row.memberPrice;
      this.dialog.form.slider.status = row.slider;
      this.dialog.form.order.status = row.canBook;
      this.dialog.form.enable.status = row.enable;
      this.dialog.form.period.content = row.creatPeriod;
      this.$tools.url2List(row.imageUrl).forEach(image => {
        this.dialog.form.image.filelist.push(image);
      });
      this.$tools.url2List(row.imageSliderUrl).forEach(image => {
        this.dialog.form.sliderimage.filelist.push(image);
      });
      this.dialog.form.desc.content = row.description;
      this.dialog.form.id = row.id;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
