import Vue from 'Vue';
import BonusPointsInfo from './BonusPointsInfo.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Tools from '@/utils/tools';

Vue.use(ElementUI);
Vue.prototype.$tools = Tools;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(BonusPointsInfo)
});
