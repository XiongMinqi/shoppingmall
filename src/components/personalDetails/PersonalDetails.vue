<template>
  <div>
    <div class="setting">
      <van-icon @click="showPopup" size="25px" color="white" name="setting" />
    </div>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      close-icon="arrow-left"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >

      <div class="msg">
        <div>个人资料</div>
        <van-cell-group>
          <div><van-field v-model="picture" label="头像" /></div>
          <div><van-field label="用户名" v-model="name" /></div>
          <div><van-field v-model="nicheng" label="昵称" /></div>
          <div><van-field v-model="sex" label="性别" /></div>
          <div><van-field v-model="email" label="邮箱" /></div>
          <div><van-field v-model="time" label="出生年月" /></div>
          <div >
            <div class="btn"><van-button type="primary" size="large">保存</van-button></div>
            <div class="btn"><van-button type="default" size="large">取消</van-button></div>
          </div>

          <!--          <van-datetime-picker-->
          <!--            v-model="currentDate"-->
          <!--            type="date"-->
          <!--            :min-date="minDate"-->
          <!--          />-->
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import { Popup } from "vant";
export default {
  name: "PersonalDetails",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      picture: "",
      name: "",
      nicheng: "",
      sex: "",
      email: "",
      time: "",
      minDate: {},
      currentDate: new Date()
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    back() {
      this.$router.back();
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
/*.msg {*/
/*  position: fixed;*/
/*  top: 60px;*/
/*  div{*/
/*    margin-bottom: 15px;*/
/*  }*/
/*  .btn{*/
/*    !*display: flex;*!*/
/*    !*justify-content: center;*!*/
/*  }*/
/*}*/
.popup {
  /*!*width: 20px;*!*/
  /*height: 10px;*/
  /*background: #e6057f;*/
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
  background: #a2a2a2;
  border-bottom: 1px solid #a2a2a2;
}
</style>
