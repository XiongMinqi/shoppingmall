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
          <div v-if="shoucang === 1">
            取消收藏
            <span class="iconheart" @click="shoucang1(pic.id)"
              ><van-icon color="red" :name="iconname"
            /></span>
          </div>
          <div v-if="shoucang === 0">
            收藏<span class="iconheart" @click="shoucang2(pic)"
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
        <!--          商品详情-->
        <div v-if="sum === 0" v-html="pic.detail"></div>
        <!--          商品评论-->
        <div v-if="sum === 1">
          <!--            有评论-->
          <div v-if="commentdetails.length > 0">
            <div v-for="(item, index) in commentdetails" :key="index">
              <div class="comments">
                <div class="usermsg">
                  <div class="userimg">
                    <img src="../../assets/image/zzf4.jpg" alt="" />
                  </div>
                  <div>
                    <div class="username">
                      <div v-if="item.user === undefined">
                        {{ item.comment_nickname }}
                      </div>
                      <div v-if="item.user !== undefined">
                        {{ item.user[0].nickname }}
                      </div>
                    </div>
                    <div class="star">
                      <van-rate
                        v-model="item.rate"
                        :size="15"
                        color="#ee0a24"
                        void-icon="star"
                        void-color="#eee"
                      />
                    </div>
                  </div>
                </div>
                <div class="time">{{ item.comment_time }}</div>
              </div>
              <!--  评论内容-->
              <div class="content">
                <div class="commenttitle">评论内容:</div>
                <div>{{ item.content }}</div>
              </div>
            </div>
          </div>
          <div class="commentword" v-else>该商品暂无评论</div>
        </div>
      </div>
    </div>
    <!--    底部购物车和立即购买-->
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :info="num"
          @click="onClickIcon"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="onClickButton(list.goodsOne.id)"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="onClickBuy"
        />
      </van-goods-action>
    </div>
    <!--    点击购买商品详情-->
    <div>
      <van-popup
        closeable
        v-model="show"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <div>
          <div class="shangping">
            <div class="spimg"><img :src="pic.image_path" alt="" /></div>
            <div class="message">
              <div>{{ pic.name }}</div>
              <div class="jiaqian">￥{{ pic.present_price }}</div>
            </div>
          </div>
          <div class="amount">
            <div>
              <div>购买数量:</div>
              <div class="shengyu">
                <div>剩余{{ pic.amount }}件</div>
                <div class="xianzhi">每人限购50件</div>
              </div>
            </div>
            <div>
              <van-stepper v-model="shuliang" />
            </div>
          </div>
          <div class="botton">
            <van-button @click="immediatebuy" type="danger" size="large"
              >立即购买</van-button
            >
          </div>
        </div>
      </van-popup>
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
      shuliang: 1,
      iconname: "like-o",
      num: 0,
      sum: 0,
      pic: {},
      picture: [],
      list: {},
      shopList: [],
      id: "",
      number: 0,
      show: false,
      price: 0,
      goodslist: {},
      shoucang: 0
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
        this.commentdetails = res.goods.comment;
        this.$set(this.pic, "directid", this.pic._id);
        this.picture.push(this.list.goodsOne.image);
        this.picture.push(this.list.goodsOne.image);
        // let aa = this.list.goodsOne.image;
        // console.log(aa, 123456);
        // console.log(res, 12345678965456);
        // console.log(this.list, "list");
        // console.log(this.pic, "pic");
        // console.log(this.commentdetails, "ommentdetails");
      } catch (e) {
        console.log(e);
      }
    },
    //查看购物车
    async getCard() {
      try {
        let res = await this.$api.getCard();
        //定义list接收数据
        this.shopList = res.shopList;
        this.shopList.map(item => {
          this.num = this.num + item.count;
          // return this.num;
        });
        // console.log(res, "查看购物车");
        // console.log(this.list, 111222222);
      } catch (e) {
        console.log(e);
      }
    },
    back() {
      this.$router.go(-1);
    },
    //取消收藏
    async shoucang1() {
      this.shoucang = 0;
      this.iconname = "like-o";
      try {
        let res = await this.$api.cancelCollection(this.pic.id);
        this.$toast.success(res.msg);
        console.log(res);
      } catch (e) {
        this.$toast.fail(e.msg);
        console.log(e);
      }
    },
    //收藏
    async shoucang2(item) {
      this.shoucang = 1;
      this.iconname = "like";
      try {
        let res = await this.$api.collection(item);
        this.$toast.success(res.msg);
        console.log(res);
      } catch (e) {
        this.$toast.fail(e.msg);
        console.log(e);
      }
    },
    //查询商品是否已收藏
    async checkshoucang() {
      try {
        let res = await this.$api.isCollection(this.id);
        this.shoucang = res.isCollection;
        if (this.shoucang === 1) {
          this.iconname = "like";
        } else {
          this.iconname = "like-o";
        }
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    // 商品详情
    showdetails() {
      this.sum = 0;
    },
    // 查询商品评论
    async showcomments() {
      this.sum = 1;
      try {
        let res = await this.$api.evaluateOne(this.pic._id);
        // console.log(this._id);
        console.log(res);
      } catch (e) {
        this.$toast.fail(e.message);
        console.log(e);
      }
    },
    // 跳转购物车
    onClickIcon() {
      this.$router.push("/shoppingcart");
    },
    //加入购物车
    async onClickButton() {
      try {
        let res = await this.$api.addShop(this.id);
        this.num = this.num + 1;
        if (res.msg === "请登录") {
          this.$router.push("/login");
        }
        // this.getCard();
        // this.$store.state.number = this.number;
        this.$toast.success(res.msg);

        // console.log(res, "商品详情");
      } catch (e) {
        //失败提示消息
        this.$toast.fail(e.msg);
        console.log(e);
      }
    },
    //购买弹出层
    onClickBuy() {
      this.show = true;
    },
    //立即购买
    immediatebuy() {
      this.$set(this.pic, "count", this.shuliang);
      this.$router.push({
        name: "settlement",
        query: {
          goodslist: JSON.stringify(this.pic),
          flag: 1,
          count: this.shuliang
        }
      });
      // console.log(this.goodslist, "商品详情goodslist");
    }
  },
  mounted() {
    // this.number = this.$store.state.number;
    this.id = this.$route.query.id;
    this.getpicture();
    this.checkshoucang();
    this.getCard();
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
.shangping {
  display: flex;
  /*padding: 20px;*/
  /*align-items: center;*/
  .message {
    /*text-align: right;*/
    /*margin-top: 30px;*/
    width: 55%;
    position: absolute;
    left: 100px;
    /*height: 80px;*/
    .jiaqian {
      margin-top: 10px;
      color: red;
    }
  }
  .spimg {
    img {
      width: 80px;
      height: 80px;
      position: fixed;
      top: 380px;
      left: 15px;
      /*position: relative;*/
      /*bottom: 15px;*/
    }
  }
}
.botton {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.amount {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f2f2f2;
  align-items: center;
  position: relative;
  top: 88px;
  padding: 10px;
  .shengyu {
    width: 100%;
    color: #b2b2b2;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .xianzhi {
      margin-left: 5px;

      color: red;
    }
  }
}
/*评论详情*/
.comments {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.usermsg {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.userimg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.username {
  margin-bottom: 10px;
}
.time {
  font-size: 14px;
  color: #b2b2b2;
}
.content {
  padding: 0 20px 10px 70px;
  border-bottom: 1px solid #f2f2f2;
    line-height: 35px;
}
.commenttitle {
  margin-bottom: 10px;
  color: #ff693b;
}
.commentword {
  text-align: center;
  min-height: 80px;
  line-height: 80px;
}
</style>
