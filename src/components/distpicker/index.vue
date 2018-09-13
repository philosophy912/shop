<template>
  <div>
    <!--
      例子
      distpicker: {
        label: '所在区域',
        disable: false,
        province: '',
        city: '',
        area: '',
        prop: 'distpicker'  是否需要校验的时候用 参考http://element-cn.eleme.io/#/zh-CN/component/form
      },
      -->
    <el-form-item
      :label="distpicker.label"
      :prop="distpicker.prop"
      :label-width="Default(distpicker.labelwidth, '100px')">
      <v-distpicker
        :placeholders="Default(distpicker.placeholders, placeholders)"
        :disabled="distpicker.disable"
        :province="distpicker.province"
        :city="distpicker.city"
        :area="distpicker.area"
        @selected="selected"
        @province="province"
        @city="city"
        @area="area">
      </v-distpicker>
    </el-form-item>
  </div>
</template>

<script type="text/ecmascript-6">
import VDistpicker from 'v-distpicker';
import Logger from 'chivy';
const log = new Logger('components/distpicker');
export default {
  name: 'DistPicker',
  data() {
    return {
      Default: this.$tools.setDefault,
      placeholders: {
        province: '省',
        city: '市',
        area: '区'
      }
    };
  },
  props: {
    distpicker: {
        type: Object
    }
  },
  methods: {
    selected(dist) {
      this.distpicker.content = dist.province.value + '-' + dist.city.value + '-' + dist.area.value;
    },
    province(province) {
      log.debug(JSON.stringify(province));
      this.distpicker.province = province.value;
    },
    city(city) {
      log.debug(JSON.stringify(city));
      this.distpicker.city = city.value;
    },
    area(area) {
      log.debug(JSON.stringify(area));
      this.distpicker.area = area.value;
    }
  },
  components: {
    VDistpicker
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
