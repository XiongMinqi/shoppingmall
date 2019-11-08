<template>
  <div class="login">
    <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
    <div class="loginlist">
      <div class="top">登录 / 注册</div>
      <div class="username">
        <van-cell-group>
          <van-field
            clearable
            v-model="ruleForm.username"
            placeholder="USERNAME"
          />
        </van-cell-group>
      </div>
      <div class="password">
        <van-cell-group>
          <van-field
            clearable
            type="password"
            v-model="ruleForm.password"
            placeholder="PASSWORD"
          />
        </van-cell-group>
      </div>
      <div class="telephone">
        <van-cell-group>
          <van-field clearable placeholder="仅注册需要" label="手机号码" />
        </van-cell-group>
      </div>
      <div class="message">
        <van-cell-group>
          <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <van-button slot="button" size="small" type="primary"
              >发送验证码</van-button
            >
          </van-field>
        </van-cell-group>
      </div>
      <div class="validation">
        <div>
          <van-cell-group clearable="true">
            <van-field
              v-model="ruleForm.validation"
              clearable
              label="验证码"
              placeholder="请输入验证码"
            />
          </van-cell-group>
        </div>
        <div @click="replaceVerify" v-html="code"></div>
      </div>
      <div class="btn">
        <div><van-button type="primary" @click="login">登录</van-button></div>
        <div>
          <van-button type="danger" @click="register">注册</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Notify } from "vant";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        validation: ""
      },
      sms: "",
      code: ""
    };
  },
  methods: {
    getAverify() {
      axios
        .get(`api/verify?mt=${Math.random()}`)
        .then(res => {
          this.code = res;
          // console.log(res.data, 12345643123);
          // console.log(this.code, "asdafsadgasfa");
        })
        .catch(err => {
          console.log(err);
        });
    },
    replaceVerify() {
      this.getAverify();
    },
    back() {
      this.$router.back();
    },
    // 注册方法
    async register() {
      try {
        let res = await this.$api.register(
          this.ruleForm.username,
          this.ruleForm.password,
          this.ruleForm.validation
        );
        if (res.code === 200) {
          //注册成功后提示信息
          Notify({
            type: "success",
            message: res.msg
          });
          //注册成功后将用户信息传到本地localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: this.ruleForm.username,
              pass: this.ruleForm.password
            })
          );
          this.$store.state.username = this.ruleForm.username;
          this.$router.push("/");
        } else {
          Notify({
            type: "danger",
            message: res.msg
          });
          this.getAverify();
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    // 登录方法
    async login() {
      try {
        let res = await this.$api.login(
          this.ruleForm.username,
          this.ruleForm.password,
          this.ruleForm.validation
        );
        if (res.code === 200) {
          //登陆成功后提示信息
          Notify({
            type: "success",
            message: res.msg
          });
          //跳转首页
          this.$router.push("/");
          //登录成功后将用户信息存到本地localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: this.ruleForm.username,
              pass: this.ruleForm.password
            })
          );
        } else {
          Notify({
            type: "danger",
            message: res.msg
          });
          this.getAverify();
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getAverify();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background: url("../../assets/image/back.jpg");
  background-size: cover;
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
    background: #a2a2a2;
    border-bottom: 1px solid #a2a2a2;
  }
  .loginlist {
    .top {
      color: white;
      font-size: 25px;
      padding: 15px;
    }
    .username {
      opacity: 0.5;
    }
    .password {
      opacity: 0.5;
    }
    .telephone {
      opacity: 0.5;
    }
    .message {
      opacity: 0.5;
    }
    .validation {
      opacity: 0.5;
    }
    position: fixed;
    left: 4vh;
    bottom: 10vh;
    width: 85%;
    height: 55vh;
    background: rgba(250, 250, 250, 0.1);
    .validation {
      display: flex;
      justify-content: space-between;
    }
    .btn {
      padding: 10px 30px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
