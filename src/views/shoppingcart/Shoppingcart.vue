<template>
  <div class="cart">
    <div class="title">购物车</div>
    <!--    购物车有商品时显示-->
    <div class="allproduct" v-if="list && list.length > 0">
      <!--      全选和总计以及删除和结算按钮-->
      <div class="money">
        <!--        全选和总计-->
        <div class="zongji">
          <!--        框框和全选文字-->
          <div class="chooselist">
            <!--     框框图片-->
            <div class="allchoose" @click="allchoose">
              <!--全选-->
              <div>
                <img
                  v-if="url === false"
                  src="../../assets/image/unchoose.svg"
                />
              </div>
              <!--取消全选-->
              <div>
                <img v-if="url === true" src="../../assets/image/choose.svg" />
              </div>
            </div>
            <!-- 选择文字-->
            <div>
              <div v-if="url === false" style="position: relative;top: 12px">
                全选
              </div>
              <div v-if="url === true" style="position: relative;top: 12px">
                取消全选
              </div>
            </div>
          </div>
          <!--        总计和确认订单-->
          <div class="jisuanjieguo">
            <div class="moneynum">
              总计：<span>￥{{ sum | keepTwoNUM }}</span>
            </div>
            <div>请确认订单</div>
          </div>
        </div>
        <div class="delete" v-if="rst === true">
          <div class="shanchu">
            <van-button color="#FF3799" @click="deleteShop">删除</van-button>
          </div>
          <div class="jiesuan">
            <van-button color="#FF3799" @click="settlement">去结算</van-button>
          </div>
        </div>
      </div>
      <!--        商品信息-->
      <div class="zhezhu">
        <div class="goods" v-for="(item, index) in list" :key="index">
          <div class="icon" @click="choose(item)">
            <img v-if="item.check" src="../../assets/image/choose.svg" alt="" />
            <img v-else src="../../assets/image/unchoose.svg" alt="" />
          </div>
          <div class="picture"><img :src="item.image_path" alt="" /></div>
          <div class="msg">
            <div class="goodsname">{{ item.name }}</div>
            <div class="number">
              <div class="price">￥{{ item.mallPrice }}</div>
              <div class="amount">
                <van-stepper integer v-model="item.count" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    购物车没商品时显示-->
    <div v-else>
      <div class="img"><img src="../../assets/image/shop.png" alt="" /></div>
      <div class="word">那么多好东西，购物车居然是空的</div>
      <div class="btn">
        <div @click="buy" v-if="name !== ''">
          <van-button type="danger">去首页逛逛</van-button>
        </div>
        <div @click="login" v-if="name === ''">
          <van-button type="danger">请登录</van-button>
        </div>
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
      item: [],
      list: [],
      id: "",
      value: 1,
      url: false,
      arr1: [],
      name: "",
      address: {},
      goodsId: [],
      amount: [],
      quantity: 0,
      rst: false,
      shoppinglist: []
    };
  },
  methods: {
    //获取购物车商品详情
    async getCard() {
      try {
        let res = await this.$api.getCard(this.id);
        //定义list接收数据
        this.list = res.shopList;
        this.list.map(item => {
          this.amount.push(item.count);
        });
        // console.log(res, 12345678965456);
        // console.log(this.list, 111222222);
      } catch (e) {
        console.log(e);
      }
    },
    //删除购物车商品
    async deleteShop() {
      try {
        let res = await this.$api.deleteShop(this.arr1);
        //删除提示消息
        this.$toast.success(res.msg);
        //删除成功后再请求一次数据
        this.getCard();
        //定义list接收数据
        console.log(res, "删除");
        // console.log(this.list, 111222222);
      } catch (e) {
        //失败提示消息
        this.$toast.fail(e.msg);
        console.log(e);
      }
    },
    //去首页逛逛
    buy() {
      this.$router.push("/mall");
    },
    // 未登录请登录
    login() {
      this.$router.push("/login");
    },
    //单选
    choose(item) {
      item.check = !item.check;
      if (item.check === true) {
        this.arr1.push(item.cid);
        this.shoppinglist.push(this.arr1);
        this.item.push(item);
        this.shoppinglist.push(this.item);
        // console.log(this.arr1, "单选");
        this.goodsId.push(item.goodsId);
        this.quantity = item.count;
        this.shoppinglist.push(this.quantity);
        this.rst = item.check;
        // console.log(this.quantity, "商品数量");
      } else if (item.check === false) {
        this.arr1 = [];
        this.shoppinglist = [];
        this.rst = false;
      }
    },
    //全选
    allchoose() {
      this.url = !this.url;
      this.list.map(item => {
        if (item.check === false && this.url === true) {
          item.check = !item.check;
          this.rst = item.check;
          this.arr1.push(item.cid);
          this.shoppinglist.push(this.arr1);
          this.item.push(item);
          this.shoppinglist.push(this.item);
          this.goodsId.push(item.goodsId);
          this.amount.map(item => {
            this.quantity += item;
            this.shoppinglist.push(this.quantity);
          });
        } else if (item.check === true && this.url === false) {
          item.check = !item.check;
          this.rst = item.check;
          this.item = [];
          this.shoppinglist = [];
          // this.money = 0;
          this.arr1 = [];
          this.shoppinglist = [];
          this.goodsId = [];
        } else if (item.check === true && this.url === true) {
          item.check = true;
          this.rst = item.check;
          this.goodsId.push(item.goodsId);
          this.item.push(item);
          this.shoppinglist.push(this.item);
          this.arr1.push(item.cid);
          this.shoppinglist.push(this.arr1);
          this.amount.map(item => {
            this.quantity += item;
            this.shoppinglist.push(this.quantity);
          });
        } else if (item.check === false && this.url === false) {
          item.check = false;
          this.rst = item.check;
          this.item = [];
          this.shoppinglist = [];
          this.arr1 = [];
          this.shoppinglist = [];
          this.goodsId = [];
        }
      });
    },
    //订单结算
    async settlement() {
      // this.shoppinglist.push(this.sum);
      this.$router.push({
        name: "settlement",
        query: { shoppinglist: this.shoppinglist, flag: 2,sum:this.sum }
      });
      console.log(this.shoppinglist);
    }
  },
  mounted() {
    this.name = this.$store.state.username;
    this.id = this.$route.query.id;
    this.getCard();
  },
  created() {},
  filters: {
    keepTwoNUM: function(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  computed: {
    sum() {
      let sum = 0;
      this.list.map(item => {
        if (item.check) {
          sum += item.mallPrice * item.count;
        }
      });
      return sum;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.cart {
  min-height: 100vh;
  background: white;
  .allproduct {
    padding-top: 45px;
    .money {
      position: fixed;
      top: 39px;
      /*display: flex;*/
      /*align-items: center;*/
      /*justify-content: space-between;*/
      /*border-bottom: 1px solid #f2f2f2;*/
      width: 100%;
      /*height: 70px;*/
      z-index: 99;
      background: #fff;
      .zongji {
        padding-right: 10px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f2f2f2;
        margin-bottom: 5px;
      }
      .jisuanjieguo {
        width: 36%;
        .moneynum {
          margin-bottom: 10px;
          span {
            color: red;
            font-weight: bold;
          }
        }
      }
      .chooselist {
        /*position: fixed;*/
        width: 120px;
        display: flex;
        /*height: 50px;*/
        /*align-items: center;*/
      }
      .allchoose {
        padding: 10px;
        width: 20px;
        /*height: 20px;*/
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .zhezhu {
    margin-top: 95px;
  }
  .goods {
    /*padding-top: 80px;*/
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    align-items: center;
    .icon {
      padding: 10px;
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
      width: 55%;
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
}
.img {
  img {
    width: 150px;
    height: 150px;
  }
  position: relative;
  top: 30px;
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
  margin-top: 55px;
  text-align: center;
  font-size: 14px;
  color: #113dff;
  /*margin: 0 auto;*/
}
.btn {
  text-align: center;
  margin-top: 35px;
}

.delete {
  display: flex;
  justify-content: flex-end;
  padding-right: 25px;
  div {
    margin-left: 5px;
  }
  /*width: 100vh;*/
  /*background: white;*/
  /*z-index: 9;*/
  /*position: fixed;*/
  /*top: 29vw;*/
  /*height: 48px;*/
  /*align-items: center;*/
  /*margin-right: 35px;*/
  .shanchu {
    /*position: fixed;*/
    /*right: 100px;*/
    /*top: 29vw;*/
    /*width: 100px;*/
  }
  .jiesuan {
    /*position: fixed;*/
    /*right: 10px;*/
    /*top: 29vw;*/
    /*width: 130px;*/
  }
  div {
    /*margin-left: 15px;*/
  }
}
</style>
