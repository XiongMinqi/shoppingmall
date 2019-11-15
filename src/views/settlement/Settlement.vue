<template>
  <div class="all">
    <!--    头部-->
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">订单结算</div>
    </div>
    <!--    地址选择-->
    <div class="address" @click="chooseaddress">
      <div class="addressicon"><van-icon size="25px" name="location-o" /></div>
      <div class="name">
        <div class="tel">
          <div>收货人:{{ address.name }}</div>
          <div class="tel">{{ address.tel }}</div>
        </div>
        <div>收货地址:{{ addressdetails }}</div>
        <div class="tishi">(收货不便时，可选择免费待收货服务)</div>
      </div>
      <div><van-icon size="25px" name="arrow" /></div>
    </div>

    <!--      直线图片-->
    <div class="img"><img src="../../assets/image/caitiao.jpg" alt="" /></div>

    <!--        结算商品信息-->
    <!--    购物车-->
    <div v-if="this.flag === 2">
      <div class="productmsg" v-for="(item,index) in listres" :key="index">
        <div class="goodspicture"><img :src="item.image_path" alt="" /></div>
        <div class="goodsname">
          <div class="productname">{{ item.name }}</div>
          <div class="right">
            <div class="price">￥{{ item.mallPrice }}</div>
            <div class="amount">X{{ item.count }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--    直接购买-->
    <div v-else-if="this.flag === 1">
      <div class="productmsg">
        <div class="goodspicture">
          <img :src="this.goodslist.image_path" alt="" />
        </div>
        <div class="goodsname">
          <div class="productname">{{ this.goodslist.name }}</div>
          <div class="right">
            <div class="price">￥{{ this.goodslist.present_price }}</div>
            <div class="amount">X{{ this.count }}</div>
          </div>
        </div>
      </div>
    </div>

    <!--    提交按钮-->
    <div class="btn">
      <div v-if="this.flag === 2" class="number">
        合计：<span>￥{{ sum | keepTwoNUM }}</span>
      </div>
      <div v-if="this.flag === 1" class="number">
        合计：<span>￥{{ price | keepTwoNUM }}</span>
      </div>
      <div class="anniu">
        <van-button @click="settlement" type="danger">提交订单</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settlement",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      address: {},
      arr1: [],
      sum: 0,
      quantity: 0,
      addressdetails: {},
      addresschoose: {},
      arr2: [],
      price: 0,
      picnum: 0,
      piclist: {},
      directid: "",
      goodslist: {},
      shoppinglist: [],
      flag: 0,
      count: 0,
      listres: []
    };
  },
  methods: {
    //订单结算
    async settlement() {
      //购物车
      if (this.flag === 2) {
        try {
          let res = await this.$api.placeOrder({
            address: this.addressdetails,
            tel: this.address.tel,
            orderId: this.arr1,
            totalPrice: this.sum,
            count: this.quantity
          });
          // this.$router.push("/settlement");
          this.$toast.success(res.msg);
          console.log(res, "结算");
          // console.log(this.list, 111222222);
        } catch (e) {
          //失败提示消息
          this.$toast.fail(e.msg);
          console.log(e);
        }
      }
      //直接购买
      else {
        console.log("1234564");
        try {
          let res = await this.$api.placeOrder({
            address: this.addressdetails,
            tel: this.address.tel,
            orderId: this.arr2,
            totalPrice: this.price,
            idDirect: true,
            count: this.count
          });
          this.$toast.success(res.msg);
          // console.log(totalPrice);
          console.log(res, "结算");
        } catch (e) {
          this.$toast.fail(e.message);
          console.log(e);
        }
      }
    },
    //获取默认地址
    async getDefaultAddress() {
      try {
        let res = await this.$api.getDefaultAddress();
        this.address = res.defaultAdd;
        this.addressdetails =
          this.address.province +
          this.address.city +
          this.address.county +
          this.address.addressDetail;
        // console.log(res, "获取默认地址");
        // console.log(this.address, "默认地址");
        // console.log(this.addressdetails, "地址详情");
      } catch (e) {
        //失败提示消息
        this.$toast.fail(e.msg);
        console.log(e);
      }
    },
    back() {
      this.$router.go(-1);
    },
    // 选择地址
    chooseaddress() {
      this.$router.push({ name: "adressList", query: { flag: this.flag } });
    }
  },
  mounted() {
    //获取默认地址
    this.getDefaultAddress();
    // 地址选择
    this.addresschoose = this.$route.query.item;
    // console.log(this.addresschoose, "addresschoose");
    // flag为1则是直接购买
    this.flag = this.$route.query.flag;
    // flag为2则是购物车结算
    this.flag = this.$route.query.flag;
    // console.log(this.flag, "flag");
    if (this.flag === 1) {
      // 直接购买接收数据
      this.goodslist = JSON.parse(this.$route.query.goodslist);
      // console.log(this.goodslist, "goodslist");
      this.count = JSON.parse(this.$route.query.count);
      // console.log(this.count, "count");
      this.arr2.push(this.goodslist.id);
      // console.log(this.arr2, "id");
      // 总计价格
      this.price = this.count * this.goodslist.present_price;
    } else if (this.flag === 2) {
      // 购物车接收数据
      this.shoppinglist = this.$route.query.shoppinglist;
      // console.log(this.shoppinglist, "shoppinglist");
      this.arr1 = this.shoppinglist[0];
      this.sum = this.$route.query.sum;
      this.quantity = this.shoppinglist[2];
      this.list = this.shoppinglist[1][0];
      this.listres = this.shoppinglist[1];
      // console.log(this.list, "list");
      // console.log(this.listres, "listres");
    }
  },
  created() {},
  filters: {
    keepTwoNUM: function(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  width: 100%;
  min-height: 95vh;
  background: white;
  /*margin-bottom: 8vh;*/
  margin-top: 7vh;
}
.top {
  width: 100%;
  height: 50px;
  display: flex;
  position: fixed;
  top: 0;
  background: white;
  z-index: 9;
  border-bottom: 1px solid #f2f2f2;
  align-items: center;
  /*justify-content: center;*/
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
.title {
  display: flex;
  align-items: center;
  position: fixed;
  left: 42%;
}
.img {
  width: 100%;
  img {
    width: 100%;
  }
}
.address {
  padding: 10px 5px 5px 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.addressicon {
  width: 10%;
}
.name {
  width: 85%;
}
.tel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.tishi {
  margin-top: 10px;
  color: #ffcd46;
}
.btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background: white;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9;
}
.number {
  /*width: 100%;*/
  margin-right: 10px;
  span {
    color: red;
  }
}
.anniu {
  /*width: 80%;*/
}
.productmsg {
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
}
.goodspicture {
  width: 25%;
  /*height: 15vh;*/
  border: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90%;
  }
}
.goodsname {
  margin-left: 3%;
  width: 72%;
  color: red;
}
.right {
  /*width: 100%;*/
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .price {
    font-weight: bold;
  }
  .amount {
    color: black;
  }
}
</style>
