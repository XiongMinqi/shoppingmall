<template>
  <div class="bottom">
    <van-tabbar v-model="active">
      <van-tabbar-item name="mall" icon="wap-home" @click="jump1"
        >商城</van-tabbar-item
      >
      <!--      to="mall"-->
      <van-tabbar-item name="classification" icon="wap-nav" @click="jump2"
        >分类</van-tabbar-item
      >
      <van-tabbar-item name="shoppingcart" icon="shopping-cart" @click="jump3"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item name="mine" icon="manager" @click="jump4"
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
    jump1() {
      this.$router.push("/");
    },
    jump2() {
      this.$router.push("/classification");
    },
    jump3() {
      this.$router.push("/shoppingcart");
    },
    jump4() {
      this.$router.push("/mine");
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
