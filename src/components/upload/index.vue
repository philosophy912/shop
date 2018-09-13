<template>
  <div>
    <!--
      例子
      {
        label: '轮 播 图',
        disable: false,
        action: url.UpLoadProductImage,
        filelist: [],
        visable: false,
        url: ''
      }
      -->
    <el-form-item
      :label="upload.label"
      :label-width="Default(upload.labelwidth, '100px')">
      <el-upload v-if="show"
        :list-type="Default(upload.listtype, 'picture-card')"
        :limit="Default(upload.limit, 10)"
        :multiple="Default(upload.multiple, false)"
        :disabled="upload.disable"
        :accept="Default(upload.accept, 'image/*')"
        :action="upload.action"
        :on-remove="onremove"
        :on-preview="onpreview"
        :on-success="onsuccess"
        :on-error="onerror"
        :file-list="upload.filelist">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="upload.visable">
        <img :width="Default(upload.width, '400px')" :height="Default(upload.height, '400px')" :src="upload.url" >
      </el-dialog>
    </el-form-item>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Upload',
  data() {
    return {
      Default: this.$tools.setDefault
    };
  },
  props: {
    upload: {
      type: Object
    }
  },
  computed: {
    show() {
      return (this.upload.filelist.length === 1 || this.upload.filelist.length < this.upload.limit);
    }
  },
  methods: {
    onremove(file) {
      this.upload.filelist.filter(image => file.url !== image.url);
      // this.$emit('onremove', file);
    },
    onpreview(file) {
      this.upload.url = file.url;
      this.upload.visable = true;
      // this.$emit('onpreview', file);
    },
    onsuccess(fileList) {
      this.upload.filelist.push({name: fileList.response.data, url: fileList.response.data});
      // this.$emit('onsuccess', fileList);
    },
    onerror(file) {
      this.$message.error('图片上传失败');
      // this.$emit('onerror', file);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
