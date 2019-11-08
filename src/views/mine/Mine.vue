<template>
  <div class="my">
    <!--    标题-->
    <div class="title">
      会员中心
    </div>
    <!--    设置弹出层-->
    <div class="set">
      <van-cell is-link @click="showPopup">
        <van-icon size="20px" name="setting" v-if="name !== ''" />
      </van-cell>
      <van-popup
        v-model="show"
        position="right"
        :closeable="true"
        close-icon="arrow-left"
        close-icon-position="top-left"
        :style="{ width: '100%', height: '100%' }"
      >
        <div class="height"></div>
        <div class="title">个人资料</div>
        <div class="github">github</div>
        <div class="headImg">
          <div>头像</div>
          <div class="right">
            <div class="bgImg">
              <img :src="this.userInfo.avatar" alt="头像" />
            </div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div>
          <van-cell-group>
            <van-field
              v-model="this.userInfo.username"
              clearable
              label="用户名"
              placeholder="请输入用户名"
            />
            <van-field
              v-model="this.userInfo.nickname"
              clearable
              label="昵称"
              placeholder="请输入昵称"
            />
            <van-field
              v-model="this.userInfo.gender"
              clearable
              label="性别"
              placeholder="请输入性别"
            />
            <van-field
              v-model="value"
              clearable
              label="邮箱"
              placeholder="请输入邮箱"
            />
            <!--            选择时间-->
            <van-field
              v-model="date"
              clearable
              label="出生年月"
              placeholder="请输入出生年月"
              @click="showTwo"
            />
            <van-popup
              v-model="showPop"
              position="bottom"
              :style="{ width: '100%', height: '40%' }"
            >
              <van-datetime-picker
                v-model="datePop"
                type="date"
                @confirm="set"
              />
            </van-popup>
          </van-cell-group>
        </div>
        <!--        保存-->
        <div class="save">
          <van-button type="primary" size="large" @click="revise"
            >保存</van-button
          >
        </div>
        <!--        取消-->
        <div class="esc">
          <van-button type="default" size="large" @click="showPopup"
            >取消</van-button
          >
        </div>
      </van-popup>
    </div>
    <!--    用户主页-->
    <div class="homepage">
      <div>
        <div class="userImg" v-if="name !== ''"></div>
        <div class="img" v-else></div>
      </div>
      <div>
        <div class="userText" v-if="name !== ''">
          <div class="top">欢迎您:{{ name }}</div>
          <div @click="sendLoginOut">退出登录</div>
        </div>
        <div class="text" @click="goTo('/login')" v-else>
          登录/注册
        </div>
      </div>
    </div>
    <!--    横向导航-->
    <div>
      <div class="userNav" v-if="name !== ''">
        <van-grid :column-num="5">
          <van-grid-item icon="paid" text="待收款" />
          <van-grid-item icon="free-postage" text="待发货" />
          <van-grid-item icon="points" text="待收货" />
          <van-grid-item icon="thumb-circle-o" text="评价" info="0" />
          <van-grid-item icon="like-o" text="已完成" />
        </van-grid>
      </div>
      <div v-else>
        <van-grid :column-num="5">
          <van-grid-item icon="paid" text="待收款" />
          <van-grid-item icon="free-postage" text="待发货" />
          <van-grid-item icon="points" text="待收货" />
          <van-grid-item icon="thumb-circle-o" text="评价" />
          <van-grid-item icon="like-o" text="已完成" />
        </van-grid>
      </div>
    </div>
    <!--    纵向导航-->
    <div class="Lnav">
      <div class="item one">
        <div class="left">
          <van-icon name="records" />
          <div>全部订单</div>
        </div>
        <van-icon name="arrow" @click="goTo('/myorder')" />
      </div>
      <div class="item two">
        <div class="left">
          <van-icon name="star-o" />
          <div>收藏商品</div>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="item">
        <div class="left">
          <van-icon name="location-o" />
          <div>地址管理</div>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="item">
        <div class="left">
          <van-icon name="eye-o" />
          <div>最近浏览</div>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import { Toast } from "vant";
// import PersonalDetails from "../../components/personalDetails/PersonalDetails";
export default {
  name: "Mine",
  components: {},
  props: {},
  data() {
    return {
      name: "",
      show: false,
      value: "",
      showPop: false,
      date: "",
      datePop: "",
      userInfo: {},
      year: "",
      month: "",
      day: ""
    };
  },
  methods: {
    //控制弹出层开关
    showPopup() {
      this.show = !this.show;
    },
    showTwo() {
      this.showPop = true;
    },
    set(value) {
      this.date = this.$dayjs(value).format("YYYY年MM月DD日");
      this.year = this.date.slice(0, 4);
      this.month = this.date.slice(5, 7);
      this.day = this.date.slice(8, 10);
      console.log(this.year, this.month, this.day);
    },
    //修改
    async revise() {
      try {
        let res = await this.$api.saveUser({
          gender: this.userInfo.gender,
          year: this.year,
          month: this.month,
          day: this.day,
          id: this.userInfo._id,
          nickname: this.userInfo.nickname
        });
        if (res.code === 200) {
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //请求时间和用户信息
    async sendDate() {
      try {
        let res = await this.$api.user();
        this.date = `${res.userInfo.year}年${res.userInfo.month}月${res.userInfo.day}日`;
        this.userInfo = res.userInfo;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    goTo(path) {
      this.$router.push(path);
    },
    //退出
    async sendLoginOut() {
      try {
        let res = await this.$api.loginOut();
        console.log(res);
        if (res.code === 0) {
          Notify({ type: "success", message: "登出成功" });
        } else {
          Notify({ type: "warning", message: "登出失败" });
        }
        this.$store.state.username = "";
        localStorage.clear();
        this.name = "";
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.sendDate();
    let users = JSON.parse(window.localStorage.getItem("user"));
    this.name = users.name;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.my {
  background: white;
  height: 100vh;
  /*标题样式*/
  .title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f2f2f2;
  }
  /*设置样式*/
  .set {
    position: absolute;
    top: 40px;
    left: 300px;
    .van-icon {
      z-index: 10;
      color: #f2f2f2;
    }
    .van-cell__right-icon {
      display: none;
    }
    .height {
      height: 10px;
    }
    .title {
      text-align: center;
    }
    .github {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
      padding: 0 16px;
    }
    .headImg {
      display: flex;
      justify-content: space-between;
      height: 100px;
      line-height: 100px;
      border-bottom: 1px solid #f2f2f2;
      padding: 0 16px;
      .right {
        display: flex;
        .bgImg {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          img {
            width: 100%;
            border-radius: 50%;
            position: relative;
            top: 10px;
            right: 20px;
            /*border: 1px solid red;*/
          }
        }
        .van-icon {
          color: black;
          position: relative;
          top: 40px;
        }
      }
    }
    /*  保存*/
    .save {
      margin-top: 20px;
      padding: 0 20px;
    }
    /*  取消*/
    .esc {
      margin-top: 20px;
      padding: 0 20px;
    }
  }
  /*用户主页*/
  .homepage {
    background: #e6057f;
    text-align: center;
    position: relative;
    padding-top: 30px;
    padding-bottom: 30px;
    /*用户登录时*/
    .userImg {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: url("../../assets/image/zzf3.jpg") no-repeat;
      background-size: cover;
      position: relative;
      left: 50%;
      margin-left: -50px;
    }
    .userText {
      margin-top: 20px;
      color: white;
      .top {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
    /*用户未登录时*/
    .img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: url("../../assets/image/zzf.jpg") no-repeat;
      background-size: cover;
      position: relative;
      left: 50%;
      margin-left: -50px;
    }
    .text {
      margin-top: 20px;
      color: white;
    }
  }
  /*  纵向导航栏*/
  .Lnav {
    .item {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: 1px solid #f2f2f2;
      .left {
        display: flex;
        justify-content: space-between;
        .van-icon {
          position: relative;
          top: 12px;
          margin-right: 3px;
        }
      }
      .van-icon {
        position: relative;
        top: 12px;
      }
    }
    .one {
      margin-bottom: 10px;
    }
    .two {
      border-top: 1px solid #f2f2f2;
    }
  }
}
</style>
