<template>
  <div class="all">
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">评价中心</div>
    </div>
    <!--    星级评论-->
    <div class="star">
      <div class="img"><img :src="list.image_path" alt="" /></div>
      <div>
        <div class="name">商品评论</div>
        <div>
          <van-rate
            v-model="value"
            :size="25"
            color="#ee0a24"
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </div>
    </div>
    <!--      文字留言-->
    <div class="van-cell-bgcolor">
      <van-cell-group>
        <van-field
          v-model="message"
          rows="8"
          autosize
          clearable
          type="textarea"
          placeholder="说说你的购买感受吧~~"
        />
      </van-cell-group>
    </div>
    <!--    匿名留言开关-->
    <div class="switchbg">
      <div class="switch">
        <van-switch v-model="checked" /><span>匿名评价</span>
      </div>
    </div>
    <!--    提交按钮-->
    <div>
      <van-button @click="comment" type="primary" size="large">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Appraise",
  components: {},
  props: {},
  data() {
    return {
      list: "",
      value: 5,
      message: "",
      checked: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //评价
    async comment() {
      try {
        let res = await this.$api.comment({
          id: this.list.cid,
          rate: this.value,
          content: this.message,
          anonymous: this.checked,
          _id: this.list._id,
          order_id: this.list.order_id,
          image: []
        });
        console.log(res, "评价");
        this.$toast.success(res.msg);
        this.$router.push("/evaluation")
        // this.list = res.data.list;
        // console.log(this.list, "list");
      } catch (e) {
        this.$toast.fail(e.msg);
        console.log(e);
      }
    }
  },
  mounted() {
    this.list = this.$route.query.item;
    console.log(this.list, "list");
    // this.evaluateOne();
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
  /*min-height: 100vh;*/
  /*background: white;*/
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
.star {
  display: flex;
  align-items: center;
  width: 100%;
  background: white;
  /*padding: 0 10px;*/
}
.img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  img {
    width: 100%;
  }
}
.name {
  margin-bottom: 15px;
}
.switchbg {
  background: white;
}
.switch {
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 10px 0;
  span {
    padding: 0 15px;
  }
}
</style>
