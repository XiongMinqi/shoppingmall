<template>
  <div class="mine">
    <div class="top"><span>会员中心</span></div>
    <div class="msg">
      <div class="setting"><van-icon color="white" name="setting" /></div>
      <div>
        <div class="img"><img src="../../assets/image/zzf3.jpg" alt="" /></div>
        <div class="author">欢迎你:{{name}}</div>
        <div class="out" @click="logout">退出登录</div>
      </div>
    </div>
    <div class="order">
      <div>
        <div><van-icon size="25px" name="pending-payment" /></div>
        <div class="words">待付款</div>
      </div>
      <div>
        <div><van-icon size="25px" name="send-gift-o" /></div>
        <div class="words">待发货</div>
      </div>
      <div>
        <div><van-icon size="25px" name="logistics" /></div>
        <div class="words">待收货</div>
      </div>
      <div>
        <div><van-icon size="25px" name="comment-o" /></div>
        <div class="words">评价</div>
      </div>
      <div>
        <div><van-icon size="25px" name="points" /></div>
        <div class="words">已完成</div>
      </div>
    </div>
    <div class="list">
      <div class="one"><van-icon size="18px" name="orders-o" />全部订单</div>
      <div class="two first">
        <van-icon size="18px" name="label-o" />收藏商品
      </div>
      <div class="two"><van-icon size="18px" name="location-o" />地址管理</div>
      <div class="two"><van-icon size="18px" name="clock-o" />最近浏览</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  components: {},
  props: {},
  data() {
    return {
      name: ""
    };
  },
  methods: {
    logout() {
      this.$router.push("/login");
    }
  },
  mounted() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    this.name = user.name;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.mine {
  width: 100%;
  background: white;
  .top {
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
  }
  .msg {
    width: 100%;
    color: white;
    height: 32vh;
    background: #e6057f;
    border-bottom: 1px solid #f2f2f2;
    .setting {
      position: absolute;
      top: 45px;
      left: 350px;
    }
    .img {
      padding-top: 40px;
      /*margin: 35px 0 25px 0;*/
      margin: 0 auto;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .author {
      margin: 15px;
      text-align: center;
      font-weight: bold;
      /*font-size: 18px;*/
    }
    .out {
      margin: 10px;
      text-align: center;
      font-size: 14px;
    }
  }
  .order {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f2f2f2;
    div {
      text-align: center;
    }
    .words {
      margin-top: 3px;
      font-size: 10px;
    }
  }
  .list {
    div {
      padding-left: 15px;
      display: flex;
      font-size: 14px;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      height: 45px;
    }
    .one {
      margin-bottom: 20px;
    }
    .first {
      border-top: 1px solid #f2f2f2;
    }
    height: 46vh;
  }
}
</style>
