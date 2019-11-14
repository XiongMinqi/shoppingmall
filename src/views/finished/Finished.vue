<template>
  <div class="all">
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">全部订单</div>
    </div>
    <!--      标签页-->
    <div class="label">
      <van-tabs v-model="active">
        <van-tab title="全部">全部</van-tab>
        <van-tab title="待支付">待支付</van-tab>
        <van-tab title="待发货">待发货</van-tab>
        <van-tab title="待收货">待收货</van-tab>
        <van-tab title="已完成">已完成</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Finished",
  components: {},
  props: {},
  data() {
    return {
      active: 4
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  width: 100%;
  min-height: 100vh;
  background: white;
}
.top {
  height: 50px;
  display: flex;
  background: white;
  border-bottom: 1px solid #f2f2f2;
  align-items: center;
  justify-content: center;
}
.icon {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  /*background: #a2a2a2;*/
  /*border-bottom: 1px solid #a2a2a2;*/
}
.label {
  /*width: 100%;*/
}
</style>
