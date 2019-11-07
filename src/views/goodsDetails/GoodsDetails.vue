<template>
  <div class="back">
    <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
    <!--    轮播图-->
    <div class="goodsdetails">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in picture" :key="index">
          <img v-lazy="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--    商品信息-->
    <div class="productmessages">
      <!--      商品简介和价格-->
      <div class="message">
        <div class="productname">{{ pic.name }}</div>
        <div class="productprice">￥{{ pic.present_price }}</div>
      </div>
      <!--      运费、剩余、收藏-->
      <div class="collect">
        <div>运费：{{ pic.__v }}</div>
        <div>剩余：{{ pic.amount }}</div>
        <div class="heart">
          <div v-if="num === 1">
            取消收藏
            <span class="iconheart" @click="change1"
              ><van-icon color="red" :name="iconname"
            /></span>
          </div>
          <div v-if="num === 0">
            收藏<span class="iconheart" @click="change2"
              ><van-icon :name="iconname"
            /></span>
          </div>
        </div>
      </div>
      <!--      进入店铺-->
      <div class="join">
        <div class="joinshop">
          <div><van-icon name="shop-o" /></div>
          <div><span>有赞的店</span></div>
          <div><van-tag type="danger">官方</van-tag></div>
        </div>
        <div class="joinshop">
          <div><span>进入店铺</span></div>
          <div><van-icon name="arrow" /></div>
        </div>
      </div>
      <!--      商品详情和评论-->
      <div class="choose">
        <div @click="showdetails" :class="{ bgcolor: sum === 0 }">商品详情</div>
        <div @click="showcomments" :class="{ bgcolor: sum === 1 }">
          商品评论
        </div>
      </div>
      <!--      显示商品详情或者评论-->
      <div class="showchoose">
        <div v-if="sum === 0" v-html="pic.detail"></div>
        <div v-if="sum === 1">评论</div>
      </div>
    </div>
    <!--    底部购物车和立即购买-->
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="onClickIcon"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="onClickButton"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="onClickButton"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsDetails",
  components: {},
  props: {},
  data() {
    return {
      iconname: "like-o",
      num: 0,
      sum: 0,
      pic: {},
      picture: [],
      list: {},
      id: ""
    };
  },
  methods: {
    //商品详情
    async getpicture() {
      try {
        let res = await this.$api.goodOne(this.id, 1);
        //定义list接收数据
        this.list = res.goods;
        this.pic = res.goods.goodsOne;
        this.picture.push(this.list.goodsOne.image);
        this.picture.push(this.list.goodsOne.image);
        // let aa = this.list.goodsOne.image;
        // console.log(aa, 123456);
        // console.log(res, 12345678965456);
        console.log(this.list, 111222222);
      } catch (e) {
        console.log(e);
      }
    },
    back() {
      this.$router.back();
    },
    change1() {
      this.num = 0;
      this.iconname = "like-o";
    },
    change2() {
      this.num = 1;
      this.iconname = "like";
    },
    showdetails() {
      this.sum = 0;
    },
    showcomments() {
      this.sum = 1;
    },
    onClickIcon() {
      // Toast("点击图标");
    },
    onClickButton() {
      // Toast("点击按钮");
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getpicture();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.back {
  .productmessages {
    margin-bottom: 56px;
  }
  width: 100%;
  background: white;
  /*height: 100vh;*/
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
  .message {
    padding: 15px;
    /*margin: 25px 0 25px 0;*/
    border-bottom: 1px solid #f2f2f2;
    .productname {
    }
    .productprice {
      margin-top: 10px;
      color: red;
      font-size: 14px;
    }
  }
  .collect {
    padding: 5px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f2f2f2;
    .iconheart {
      /*padding-top: 3px;*/
    }
  }
  .join {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    padding: 10px 15px;
    .joinshop {
      display: flex;
      align-items: center;
    }
  }
  .choose {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    padding: 10px 60px;
    .bgcolor {
      color: red;
    }
  }
}
.goodsdetails {
  overflow: hidden;
  /*width: 95%;*/
  /*margin: 0 auto;*/
  height: 375px;
  border-bottom: 1px solid #f2f2f2;
  /*background: white;*/
  /*margin-top: 55px;*/
}
img {
  width: 100%;
  height: 375px;
}
</style>
