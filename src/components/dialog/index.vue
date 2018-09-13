<template>
  <div class="popup">
    <!--
      只需要设置title和visable即可
      {
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
      }

    -->
    <el-dialog
      @close="closeDialog"
      :title="dialog.title"
      :visible.sync="dialog.visible"
      :show-close="Default(dialog.showclose, true)"
      :width="Default(dialog.width, '50%')"
      :top="Default(dialog.top, '15vh')"
      :label-width="Default(dialog.labelwidth, '100px')"
      :center="Default(dialog.center, false)">
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button :type="Default(dialog.footer.left.type, 'danger')" @click="left">{{Default(dialog.footer.left.text, '确认')}}</el-button>
        <el-button :type="Default(dialog.footer.right.type, 'primary')" @click="right">{{Default(dialog.footer.right.text, '取消')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import Logger from 'chivy';
const log = new Logger('components/dialog');
export default {
  name: 'Dialog',
  data() {
    return {
      Default: this.$tools.setDefault
    };
  },
  props: {
    dialog: {
      type: Object
    }
  },
  methods: {
    left() {
      this.$emit('left', this.dialog.content);
    },
    right() {
      log.info('dialog right button clicked');
      this.$emit('right');
    },
    closeDialog() {
      this.$emit('closeDialog');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
