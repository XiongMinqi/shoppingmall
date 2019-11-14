<template>
  <div class="all">
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">评价中心</div>
    </div>
    <div class="img"><img src="../../assets/image/evaluate.jpg" alt="" /></div>
    <div class="fenlei">
      <van-tabs v-model="active">
        <van-tab title="待评价">
          <!--      未评价-->
          <div class="unevaluation">
            <div class="pinglun" v-for="(item, index) in list" :key="index">
              <div class="picture"><img :src="item.image_path" alt="" /></div>
              <div class="msg">
                <div class="name">{{ item.name }}</div>
                <div class="iconchat">
                  <van-button
                    @click="evaluation(item)"
                    size="small"
                    round
                    plain
                    hairline
                    type="danger"
                  >
                    <div><van-icon color="red" name="chat" /> 评论晒单</div>
                  </van-button>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已评价">
          <!--      已评价-->
          <div class="alevaluation">
            <div class="unevaluation">
              <div
                class="pinglun"
                v-for="(item, index) in evaluationes"
                :key="index"
              >
                <div class="picture">
                  <img :src="item.goods[0].image" alt="" />
                </div>
                <div class="msg">
                  <div class="name">{{ item.goods[0].name }}</div>
                  <div class="iconchat">
                    <van-button
                      @click="look(item)"
                      size="small"
                      round
                      plain
                      hairline
                      type="primary"
                    >
                      <div><van-icon color="freen" name="eye-o" /> 查看评论</div>
                    </van-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Evaluation",
  components: {},
  props: {},
  data() {
    return {
      num: 0,
      active: 0,
      list: [],
      evaluationes: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //查询未评价
    async tobeEvaluated() {
      try {
        let res = await this.$api.tobeEvaluated();
        // console.log(res, "未评价");
        this.list = res.data.list;
        // console.log(this.list, "list");
      } catch (e) {
        console.log(e);
      }
    },
    //查询已评价
    async alreadyEvaluated() {
      try {
        let res = await this.$api.alreadyEvaluated();
        // console.log(res, "已评价");
        this.evaluationes = res.data.list;
        // console.log(this.evaluationes, "已评价");
      } catch (e) {
        console.log(e);
      }
    },
    evaluation(item) {
      this.$router.push({ name: "appraise", query: { item: item } });
    },
    look(item) {
      this.$router.push({ name: "comments", query: { item: item } });
    }
  },
  mounted() {
    this.tobeEvaluated();
    this.alreadyEvaluated();
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
.img {
  width: 100%;
  img {
    width: 100%;
  }
}
.fenlei {
  /*  display: flex;*/
  /*  justify-content: space-around;*/
  width: 90%;
  /*  !*margin: 0 auto;*!*/
  /*  padding: 15px 0;*/
  /*  background: skyblue;*/
  border-radius: 8px;
  position: relative;
  bottom: 3vh;
  /*top: 37vh;*/
  left: 5%;
  z-index: 9;
}
.pinglun {
  display: flex;
  justify-content: space-between;
  /*padding: 0 15px;*/
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
}
.msg {
  width: 60%;
  margin-left: 5vh;
}
.picture {
  width: 100px;
  /*height: 100px;*/
  img {
    width: 100%;
  }
}
.iconchat {
  /*position: relative;*/
  /*left: 60%;*/
  /*width: 50%;*/
  margin-right: 15px;
  text-align: right;
}
.name {
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
