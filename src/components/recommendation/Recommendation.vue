<template>
  <div class="body">
    <div class="title">商品推荐</div>
    <div ref="wrap" class="rampage-wrapper">
      <!-- 横向滚动 -->
      <div>
        <div class="rampageScroll">
          <div class="rampage-list" v-for="(item, index) in list" :key="index">
            <div>
              <img @click="jump2(item.goodsId)" :src="item.image" alt="" />
              <div @click="jump2(item.goodsId)" class="word">
                {{ item.goodsName }}
              </div>
              <div class="price">
                <span>￥{{ item.price }}</span>
                <span class="jiage">￥{{ item.mallPrice }}</span>
              </div>
              <div class="btm">
                <van-button
                  type="warning"
                  class="btn"
                  @click="jump1(item.goodsId)"
                  ><van-icon name="shopping-cart"
                /></van-button>
                <van-button
                  type="danger"
                  class="btn"
                  @click="jump2(item.goodsId)"
                  >商品详情</van-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 better-scroll 插件
import BScroll from "better-scroll";

export default {
  name: "Recommendation",
  components: {
    // BScroll
  },
  props: {},
  data() {
    return {
      // name: "CityList",
      list: [],
      pulldown: true,
      id: ""
    };
  },
  methods: {
    //推荐商品
    async getscroll() {
      try {
        let res = await this.$api.recommend();
        //定义list接收数据
        this.list = res.data.recommend;
        // this.list.map(item => {
        //   this.id = item.goodsId;
        // });
        // console.log(res, 11111111);
        // console.log(this.list, "推荐商品");
      } catch (e) {
        console.log(e);
      }
    },
    //加入购物车
    async jump1(id) {
      try {
        let res = await this.$api.addShop(id);
        // this.num = this.num + 1;
        if (res.msg === "请登录") {
          this.$router.push("/login");
        }
        // this.getCard();
        // this.$store.state.number = this.number;
        this.$toast.success(res.msg);

        // console.log(res, "商品详情");
      } catch (e) {
        //失败提示消息
        this.$toast.danger(e.msg);
        console.log(e);
      }
    },
    // jump1() {
    //   this.$router.push("/shoppingcart");
    // },
    jump2(id) {
      this.$router.push({
        name: "goodsDetails",
        query: { id: id }
      });
    }
  },
  mounted() {
    this.getscroll();
    /**
     * 横向滚动
     */
    // 第一种方法
    // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
    this.$nextTick(() => {
      // 初始化
      new BScroll(this.$refs.wrap, {
        startX: 0,
        click: true,
        scrollX: true
      });
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}
.rampageScroll {
  display: flex;
  flex: 1;
}
.rampage-wrapper {
  /*width: 100%;*/
  overflow: hidden;
  background: #fff;
  display: flex;
}
.rampage-list {
  border: 1px solid #f2f2f2;
  width: 150px;
  list-style: none;
  /*display: inline-block;*/
  padding-left: 10px;
  padding-bottom: 15px;
  text-align: center;
}
.rampage-list img {
  width: 150px;
  height: 150px;
}
.word {
  height: 20px;
  /*display: inline-block;*/
  /*width: 350px;*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.body {
  padding-top: 5px;
  background: white;
}
.btn {
  /*margin: 0 auto;*/
  margin-top: 10px;
  padding: 0 15px;
  /*display: flex;*/
  /*align-items: center;*/
}
.btm {
  margin: 0 auto;
}
.jiage {
  padding-left: 6px;
  font-size: 12px;
  text-decoration: line-through;
  color: #b2b2b2;
}
.price {
  text-align: left;
}
.title {
  padding: 10px;
}
</style>
