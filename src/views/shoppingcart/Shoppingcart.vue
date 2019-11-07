<template>
  <div class="cart">
    <div class="title">购物车</div>
    <div v-if="list.length > 0"></div>
    <div v-else>
      <div class="img"><img src="../../assets/image/shop.png" alt="" /></div>
      <div class="word">那么多好东西，购物车居然是空的</div>
      <div class="btn" @click="buy"><van-button type="danger">去首页逛逛</van-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shoppingcart",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    buy() {
      this.$router.push("/mall");
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
.cart {
  .title{
    text-align: center;
    padding: 11px 0;
    border-bottom: 1px solid #f2f2f2;
  }
  /*padding-top: 40px;*/
  height: 100vh;
  background: white;
}
.img {
  img {
    width: 150px;
    height: 150px;

    /*border-radius: 50%;*/
  }
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 1px solid #c2c2c2;
}
.word {
  margin-top: 35px;
  text-align: center;
  font-size: 14px;
  color: #113dff;
  /*margin: 0 auto;*/
}
  .btn{
    text-align: center;
    margin-top: 35px;
  }
</style>
