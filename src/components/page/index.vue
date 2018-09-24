<template>
  <div class="page-wrapper">
    <tb
      ref='tb'
      @format="format"
      @add="add"
      @find="find"
      @detail="detail"
      @modify="modify"
      @delete="del"
      @operation="operation"
      :tabbarPlaceholder="tabbar.placeholder"
      :tabbarOpsbtns="tabbar.opsbtns"
      :mainColumns="table.columns"
      :mainOpsbtns="table.opsbtns"
      :url="url"
      :request="request">
    </tb>
    <dig
      @left="left"
      @right="right"
      :dialog="dialog">
      <el-form :model='dialog.form' :rules='dialog.rules' ref='rule'>
        <slot></slot>
      </el-form>
    </dig>
    <dig
      @left="confirm"
      @right="cancel"
      :dialog="popup">
      <span>{{popup.text}}</span>
    </dig>
  </div>
</template>

<script>
import tb from '@/components/table';
import dig from '@/components/dialog';
import Logger from 'chivy';
const log = new Logger('components/page');
export default {
  name: 'Page',
  data() {
    return {
      popup: {
        title: '警告',
        visible: false,
        width: '30%',
        content: '',
        text: '',
        footer: {
          left: {
            text: '确认'
          },
          right: {
            text: '取消'
          }
        }
      },
      request: {
        entityId: '',
        entityName: '',
        envData: {
          pageNo: 1,
          pageSize: 20
        }
      }
    };
  },
  props: {
    tabbar: {
      type: Object
    },
    table: {
      type: Object
    },
    url: {
      type: Object
    },
    // 对话框，必须要传数据
    dialog: {
      type: Object
    }
  },
  components: {
    tb,
    dig
  },
  methods: {
    format(data) {
      return data.cellValue;
      // this.$emit('format', data);
    },
    // 确认删除
    confirm(row) {
      this.popup.visible = false;
      this.$emit('delete', row);
    },
    cancel() {
      this.popup.visible = false;
    },
    operation(data) {
      const index = data.index;
      const row = data.row;
      this.$emit(data.ops, {index, row});
    },
    find(payload) {
      log.debug('find paylod is ' + JSON.stringify(payload));
      this.request.entityName = payload;
      this.$refs.tb.GetDataAndPages(this.request);
    },
    add() {
      this.setDialog(this.dialog.addTitle, '增加', '取消', 'ADD');
      this.resetFormValue();
      // this.$refs.rule.resetFields();
      this.setDialogVisable(true);
    },
    detail(data) {
      log.debug('detail recive data is ' + JSON.stringify(data));
      this.setDialog(this.dialog.detailTitle, '确认', '取消', 'DETAIL');
      this.setEnable(true);
      // 外部调用组织数据，完成后设置为可见
      this.$emit('detail', data);
    },
    modify(data) {
      this.setDialog(this.dialog.modifyTitle, '修改', '取消', 'MODIFY');
      this.setEnable(false);
      // 外部调用组织数据，完成后设置为可见
      this.$emit('modify', data);
    },
    left() {
      log.info('dialog left button clicked');
      this.$refs.rule.validate(valid => {
        log.debug('valid is ' + valid);
        if (valid) {
          switch (this.dialog.action) {
            case 'MODIFY':
              this.$emit('confirmModify');
              break;
            case 'DETAIL':
              this.setDialogVisable(false);
              this.setEnable(false);
              break;
            case 'ADD':
              this.$emit('confirmAdd');
              break;
            default:
              // 最好加一个lowercase
              this.$emit(this.dialog.action);
          }
        }
      });
    },
    right() {
      log.debug('The footer right button clicked');
      this.resetFormValue();
      this.setDialogVisable(false);
      this.setEnable(false);
      this.$refs.rule.resetFields();
    },
    del(data) {
      log.debug('del data is ' + JSON.stringify(data));
      this.popup.content = data;
      this.$tools.isNotEmpty(this.dialog.deleteTitle) ? this.popup.text = this.dialog.deleteTitle : this.popup.text = '是否删除[' + data.row.name + ']?';
      this.popup.visible = true;
    },
    // 设置dialog的名字及按钮名
    setDialog(title, leftName, rightName, action) {
      this.dialog.title = title;
      this.dialog.action = action;
      this.dialog.footer.left.text = leftName;
      this.dialog.footer.right.text = rightName;
    },
    // 设置dialog是否可见
    setDialogVisable(flag) {
      this.dialog.visible = flag;
    },
    // 重置Form参数
    resetFormValue() {
      Object.keys(this.dialog.form).forEach(key => {
        if (this.$tools.isNotUndefined(this.dialog.form[key].content)) {
          this.dialog.form[key].content = '';
        } else if (this.$tools.isNotUndefined(this.dialog.form[key].status)) {
          this.dialog.form[key].status = false;
        } else if (key === 'image' || key === 'sliderimage') {
          log.debug(key + ' value is ' + JSON.stringify(this.dialog.form[key]));
          this.dialog.form[key].filelist = [];
        } else if (key === 'sex') {
          this.dialog.form[key].content = '女';
        } else if (key === 'id') {
          this.dialog.form[key] = '';
        }
      });
    },
    // 设置是否可修改
    setEnable(flag) {
      Object.keys(this.dialog.form).forEach(key => {
        const isDisable = this.$tools.isNotEmpty(this.dialog.form[key].disable);
        let isModify = true;
        if (this.$tools.isNotEmpty(this.dialog.form[key].modify)) {
          isModify = this.dialog.form[key].modify;
        }
        if (isDisable && isModify) {
          this.dialog.form[key].disable = flag;
        }
      });
    },
    // 刷新表格数据
    refreshData() {
      this.$refs.tb.GetDataAndPages(this.request);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


</style>
