<template>
  <div class='MemberListTest'>
    <page
      ref="page"
      @detail="detail"
      @modify="modify"
      @confirmModify="actionModify"
      :tabbar="tabbar"
      :table="table"
      :dialog="dialog"
      :url="url">
      <it :input='dialog.form.name'></it>
      <ra :radios='dialog.form.sex'></ra>
      <dap :datepicker="dialog.form.born"></dap>
      <disp :distpicker="dialog.form.area"></disp>
      <it :input='dialog.form.dist'></it>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import ra from '@/components/radio';
import dap from '@/components/datepicker';
import disp from '@/components/distpicker';
import { isSelectValid, isDateValid } from '@/utils/validate';
import { modifyBasicInfo } from '@/api/member';
import Logger from 'chivy';
const log = new Logger('views/MemberBasic');
export default {
  name: 'MemberBasic',
  components: {
    page,
    it,
    ra,
    dap,
    disp
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
          {prop: 'name', label: '会员号/手机号码/电子邮箱', width: "220", fixed: true},
          {prop: 'genderStr', label: '性别', width: "60"},
          {prop: 'birthDay', label: '生日', width: "120"},
          {prop: 'region', label: '所在区域', width: "120"},
          {prop: 'address', label: '详细地址'},
          {prop: 'createTimeAsString', label: '创建时间', width: "180"}
        ],
        opsbtns: [
          {type: 'info',  text: '详情', ops: 'detail'},
          {type: 'primary', text: '修改', ops: 'modify'}
        ]
      },
      url: {
        data: '/member/show/ui/getBasicInfoList.do',
        page: '/member/show/ui/getBasicInfoPage.do'
      },
      dialog: {
        detailTitle: '会员详情',
        modifyTitle: '修改详情',
        title: '',
        action: '',
        width: '60%',
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
            modify: false,
            disable: true
          },
          sex: {
            label: '会员性别',
            content: '男',
            disable: false,
            radios: [{
              label: '男'
            },
            {
              label: '女'
            }],
            must: true,
            prop: 'sex'
          },
          born: {
            label: '会员生日',
            content: '',
            placeholder: '请选择会员生日',
            disable: false,
            must: false,
            prop: 'born'
          },
          area: {
            label: '所在区域',
            disable: false,
            placeholders: {
              province: '省',
              city: '市',
              area: '区'
            },
            content: '',
            province: '',
            city: '',
            area: ''
          },
          dist: {
            label: '详细地址',
            content: '',
            placeholder: '请输入详细地址',
            disable: false
          },
          id: ''
        },
        // 校验部分的设置pop名字和formitem必须一致
        rules: {
          sex: [
            { required: false, validator: isSelectValid, trigger: 'blur' }
          ],
          born: [
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
    actionModify() {
      log.debug('update data is ' + JSON.stringify(this._setParam(false)));
      modifyBasicInfo(this._setParam()).then(resp => {
        this.$message.success('修改会员信息成功');
        this.$refs.page.refreshData();;
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
        name: this.dialog.form.name.content.split('/')[1],
        genderStr: this.$tools.isNotEmpty(this.dialog.form.sex.content) ? this.$tools.sex(this.dialog.form.sex.content) : '',
        birthDay: this.$tools.isNotEmpty(this.dialog.form.born.content) ? this.$tools.date2Long(this.dialog.form.born.content) : '',
        address: this.dialog.form.dist.content,
        region: this.dialog.form.area.content,
        memberId: this.dialog.form.id
      };
    },
    // 设置Form参数
    _setFormValue(row) {
      this.dialog.form.name.content = row.name;
      this.dialog.form.sex.content = (this.$tools.isNotEmpty(row.genderStr) && row.genderStr !== 'N') ? this.$tools.sex(row.genderStr) : '男';
      this.dialog.form.born.content = this.$tools.isNotEmpty(row.birthDay) ? this.$tools.formatTime(row.birthDay, '-') : '';
      this.dialog.form.area.content = row.region;
      this.dialog.form.dist.content = row.address;
      this.dialog.form.id = row.memberId;
      this.__setRegion(row.region);
    },
    // 根据内容设置到省市区选择中
    __setRegion(region) {
      if (this.$tools.isNotEmpty(region)) {
        const regions = region.split('-');
        this.dialog.form.area.province = regions[0];
        this.dialog.form.area.city = regions[1];
        this.dialog.form.area.area = regions[2];
        return regions;
      } else {
        this.dialog.form.area.province = '';
        this.dialog.form.area.city = '';
        this.dialog.form.area.area = '';
        return region;
      }
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
