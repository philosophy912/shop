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
      <it :input='dialog.form.level'></it>
      <it :input='dialog.form.min'></it>
      <it :input='dialog.form.max'></it>
      <it :input='dialog.form.desc'></it>
    </page>
  </div>
</template>

<script type='text/ecmascript=6'>
import page from '@/components/page';
import it from '@/components/input';
import { isNameValid, isIntegerValid } from '@/utils/validate';
import { createBonusPointsGrade, modifyBonusPointsGrade, deleteBonusPointsGrade } from '@/api/bonuspoints';
import Logger from 'chivy';
const log = new Logger('views/Categorys');
export default {
  name: 'BonusPointsGrade',
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
          {prop: 'name', label: '名称', width: "200", fixed: true},
          {prop: 'level', label: '级别', width: "100", fixed: true},
          {prop: 'minPoint', label: '积分下限', width: "100"},
          {prop: 'maxPoint', label: '积分上限', width: "100"},
          {prop: 'description', label: '描述'},
          {prop: 'createTimeAsString', label: '创建时间', width: "180"}
        ]
      },
      url: {
        data: '/member/bonuspoints/ui/getInfos.do',
        page: '/member/bonuspoints/ui/getInfoPage.do'
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
          name: {
            label: '级别名称',
            content: '',
            placeholder: '请输入级别名称',
            disable: false,
            must: true,
            prop: 'name'
          },
          level: {
            label: '级别数值',
            content: '',
            placeholder: '请输入整数，值越大级别越高',
            disable: false,
            must: true,
            prop: 'level'
          },
          min: {
            label: '积分下限',
            content: '',
            placeholder: '请输入整数',
            disable: false,
            must: true,
            prop: 'min'
          },
          max: {
            label: '积分上限',
            content: '',
            placeholder: '请输入整数',
            disable: false,
            must: true,
            prop: 'max'
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
          name: [
            { required: true, validator: isNameValid, trigger: 'blur' }
          ],
          // TODO 暂时只校验正整数
          level: [
            { required: true, validator: isIntegerValid, trigger: 'blur'}
          ],
          // TODO 暂时只校验正整数
          min: [
            { required: true, validator: isIntegerValid, trigger: 'blur'}
          ],
          // TODO 暂时只校验正整数
          max: [
            { required: true, validator: isIntegerValid, trigger: 'blur' }
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
      deleteBonusPointsGrade(data).then(resp => {
        this.$message.success('删除级别成功');
        this.$refs.page.refreshData();
      });
    },
    actionModify() {
      log.debug('update data is ' + JSON.stringify(this._setParam(false)));
      modifyBonusPointsGrade(this._setParam(false)).then(resp => {
        this.$message.success('修改级别成功');
        this.$refs.page.refreshData();
      });
      this.$refs.page.setDialogVisable(false);
    },
    actionAdd() {
      log.info('add ops');
      createBonusPointsGrade(this._setParam(true)).then(resp => {
        this.$message.success('添加级别成功');
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
        level: this.dialog.form.level.content,
        minPoint: this.dialog.form.min.content,
        maxPoint: this.dialog.form.max.content,
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
      this.dialog.form.level.content = row.level;
      this.dialog.form.min.content = row.minPoint;
      this.dialog.form.max.content = row.maxPoint;
      this.dialog.form.desc.content = row.description;
      this.dialog.form.id = row.id;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
