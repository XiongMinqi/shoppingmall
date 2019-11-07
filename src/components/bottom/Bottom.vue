<template>
  <div class="bottom">
    <van-tabbar v-model="active">
      <van-tabbar-item name="mall" icon="wap-home" to="mall"
        >商城</van-tabbar-item
      >
      <van-tabbar-item name="classification" icon="wap-nav" to="classification"
        >分类</van-tabbar-item
      >
      <van-tabbar-item
        name="shoppingcart"
        icon="shopping-cart"
        to="shoppingcart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item name="mine" icon="manager" to="mine"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Bottom",
  components: {},
  props: {},
  data() {
    return {
      active: 0
    };
  },
  methods: {
    jump1() {}
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
/*.bottom {*/
/*  position: fixed;*/
/*}*/
/*.bottom{*/
/*  div{*/
/*    text-align: center;*/
/*  }*/
/*  display: flex;*/
/*  justify-content: space-around;*/
/*  !*position: fixed;*!*/
/*  !*bottom: 10px;*!*/
/*}*/
</style>
