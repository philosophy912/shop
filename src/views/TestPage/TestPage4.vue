<template>
  <div class='TestPage'>
    <tb
      :data="newData">
    </tb>
  </div>
</template>

<script type='text/ecmascript=6'>
import tb from './Table';
/* import Logger from 'chivy';
const log = new Logger('views/TestPage'); */
export default {
  name: 'TestPage',
  components: {
    tb
  },
  data() {
    return {
      newData: [{
        'code': 'cb6c8047-935b-4080-a747-dc0264dafd52',
        'createTime': 1514665966000,
        'createTimeAsString': '2017-12-30 20:32:46',
        'creatorId': -1,
        'defaultEntity': false,
        'description': '蛋糕',
        'id': 2,
        'name': '蛋糕',
        'objClass': 'com.xdt.ums.shop.common.entity.CategoryImpl'
      }, {
        'code': 'a2b41dc3-422f-48d0-8c0d-ff47e4ebcb7e',
        'createTime': 1514930342000,
        'createTimeAsString': '2018-01-02 21:59:02',
        'creatorId': -1,
        'defaultEntity': false,
        'description': '饼干',
        'id': 69,
        'name': '饼干',
        'objClass': 'com.xdt.ums.shop.common.entity.CategoryImpl'
      }, {
        'code': 'f98907d2-863f-4b86-b55d-61261a964e6f',
        'createTime': 1531088838000,
        'createTimeAsString': '2018-07-08 22:27:18',
        'creatorId': -1,
        'defaultEntity': false,
        'description': '',
        'id': 614,
        'name': '饮品',
        'objClass': 'com.xdt.ums.shop.common.entity.CategoryImpl'
      }, {
        'code': '8e4d7484-b43c-4062-91fa-a45793216548',
        'createTime': 1531089837000,
        'createTimeAsString': '2018-07-08 22:43:57',
        'creatorId': -1,
        'defaultEntity': false,
        'description': '',
        'id': 618,
        'name': '婚礼甜品台',
        'objClass': 'com.xdt.ums.shop.common.entity.CategoryImpl'
      }]
    };
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
