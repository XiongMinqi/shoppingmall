<template>
  <div class="all">
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">评价详情</div>
    </div>
    <!--      头部-->
    <div class="head">
      <div class="msg">
        <div class="img"><img src="../../assets/image/zzf.jpg" alt="" /></div>
        <div class="mingzi">
          <div class="name">{{ user.nickname }}</div>
          <div>
            <van-rate
              v-model="list.rate"
              :size="25"
              readonly
              color="#ee0a24"
              void-icon="star"
              void-color="#eee"
            />
          </div>
        </div>
      </div>
      <div class="time">{{ arr1.comment_time }}</div>
    </div>
    <!--      评价内容-->
    <div class="neirong">评价内容：{{ list.content }}</div>
    <!--      商品信息-->
    <div class="goods">
      <div class="goodsmsg">
        <div class="goodsimg">
          <img :src="goods.image_path" alt="" />
        </div>
        <div>{{ goods.name }}</div>
      </div>
      <div>
        <van-button
          @click="onClickButton(id)"
          size="small"
          round
          type="warning"
          ><van-icon color="red" size="25px" name="shopping-cart-o"
        /></van-button>
      </div>
    </div>
    <!--    返回按钮-->
    <div class="btn">
      <van-button @click="back" type="primary" size="large">返回</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
  components: {},
  props: {},
  data() {
    return {
      id: [],
      user: {},
      list: {},
      arr1: {},
      goods: {}
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //查询未评价
    async evaluateOne() {
      try {
        let res = await this.$api.evaluateOne(this.list._id);
        console.log(res, "单条评论");
        this.arr1 = res.evaluateOne;
        this.id.push(this.arr1.cid)
        this.goods = this.arr1.goods[0];
        this.user = this.arr1.user[0];
        console.log(this.user, "user");
        console.log(this.arr1, "arr1");
        console.log(this.goods, "goods");
        // this.list = res.data.list;
        // console.log(this.list, "list");
      } catch (e) {
        console.log(e);
      }
    },
    //加入购物车
    async onClickButton() {
      try {
        let res = await this.$api.addShop(this.id);
        this.$toast.success(res.msg);
        // console.log(res, "商品详情");
      } catch (e) {
        //失败提示消息
        this.$toast.fail(e.msg);
        console.log(e);
      }
    }
  },
  mounted() {
    // let users = JSON.parse(window.localStorage.getItem("user"));
    // this.name = users.name;
    // console.log(this.name, "name");
    this.list = this.$route.query.item;
    console.log(this.list, "list");
    this.evaluateOne();
  },
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
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*border-bottom: 1px solid #f2f2f2;*/
  padding: 10px;
}
.msg {
  width: 66%;
  display: flex;
  align-items: center;
  /*justify-content: space-between;*/
}
.img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  /*background: url("../../assets/image/zzf.jpg") no-repeat;*/
  /*background-size: cover;*/
  /*position: relative;*/
  /*left: 50%;*/
  /*margin-left: -50px;*/
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.name {
  margin-bottom: 15px;
}
.mingzi {
  margin-left: 15px;
}
.neirong {
  padding: 5px;
  border-bottom: 1px solid #f2f2f2;
}
.btn {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.time {
  font-size: 10px;
}
.name {
}
.goods {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.goodsimg {
  width: 90px;
  height: 90px;
  img {
    width: 100%;
  }
}
.goodsmsg {
  width: 90%;
  display: flex;
  align-items: center;
}
</style>
