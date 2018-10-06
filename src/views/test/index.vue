<template>
  <div class="test-Wrapper">
    {{id}}
  </div>
</template>

<script type="text/ecmascript=6">
import Logger from 'chivy';
const log = new Logger('views/test');
export default {
  name: 'Test',
  components: {
  },
  beforeRouteEnter(from, to, next) {
    next(vm => {
      log.debug(vm)
    });
  },
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
