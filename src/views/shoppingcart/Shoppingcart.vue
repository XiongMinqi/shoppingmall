<template>
  <div class="cart">
    <div class="title">购物车</div>
    <!--    购物车有商品时显示-->
    <div class="allproduct" v-if="list.length > 0">
      <div class="goods" v-for="(item, index) in list" :key="index">
        <div class="icon" @click="choose">
          <img
            v-if="url === true"
            src="../../assets/image/unchoose.svg"
            alt=""
          />
          <img
            v-if="url === false"
            src="../../assets/image/choose.svg"
            alt=""
          />
        </div>
        <div class="picture"><img :src="item.image_path" alt="" /></div>
        <div class="msg">
          <div class="goodsname">{{ item.name }}</div>
          <div class="number">
            <div class="price">￥{{ item.mallPrice }}</div>
            <div class="amount"><van-stepper integer  v-model="value" /></div>
          </div>
        </div>
      </div>
    </div>
    <!--    购物车没商品时显示-->
    <div v-else>
      <div class="img"><img src="../../assets/image/shop.png" alt="" /></div>
      <div class="word">那么多好东西，购物车居然是空的</div>
      <div class="btn" @click="buy">
        <van-button type="danger">去首页逛逛</van-button>
      </div>
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
      list: [],
      id: "",
      value: 1,
      url: true
    };
  },
  methods: {
    async getCard() {
      try {
        let res = await this.$api.getCard(this.id);
        //定义list接收数据
        this.list = res.shopList;
        // this.pic = res.goods.goodsOne;
        // this.picture.push(this.list.goodsOne.image);
        // this.picture.push(this.list.goodsOne.image);
        // let aa = this.list.goodsOne.image;
        // console.log(aa, 123456);
        console.log(res, 12345678965456);
        console.log(this.list, 111222222);
      } catch (e) {
        console.log(e);
      }
    },
    buy() {
      this.$router.push("/mall");
    },
    choose() {
      this.url = !this.url;
    }
  },
  mounted() {
    this.getCard();
    this.id = this.$route.query.id;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.cart {
  .allproduct {
    padding-top: 45px;
  }
  .goods {
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    align-items: center;
    .icon {
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .picture {
      display: flex;
      align-items: center;
      width: 110px;
      height: 100px;
      img {
        width: 90%;
        height: 90%;
        border: 1px solid #f2f2f2;
      }
    }
    .msg {
      font-size: 15px;
      color: #ff4d48;
      width: 60%;
      padding: 15px 0 15px 5px;
      .goodsname {
      }
      .number {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30px;
        .price {
        }
        .amount {
        }
      }
    }
  }
  .title {
    width: 100%;
    text-align: center;
    background: white;
    padding: 11px 0;
    border-bottom: 1px solid #f2f2f2;
    position: fixed;
    top: 0;
    z-index: 9;
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
.btn {
  text-align: center;
  margin-top: 35px;
}
</style>
