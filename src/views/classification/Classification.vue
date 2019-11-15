<template>
  <div class="classification">
    <div class="top">
      <span class="title">商品分类</span>
    </div>

    <!--    左边导航栏-->
    <div class="list">
      <div v-for="(item, index) in list" :key="index">
        <div
          class="word"
          :class="{ bgcolor: index === number }"
          @click="send(index)"
        >
          {{ item.mallCategoryName }}
        </div>
      </div>
    </div>
    <!--右边标签栏-->
    <div class="menu">
      <van-tabs
        v-model="active"
        :ellipsis="false"
        :swipeable="true"
        @click="getid"
      >
        <van-tab
          v-for="(item, index) in arr"
          :key="index"
          :title="item.mallSubName"
          :name="item.mallSubId"
        >
        </van-tab>
      </van-tabs>
    </div>
    <!--            产品列表-->
    <div class="goods" v-for="(item, index) in listid.dataList" :key="index">
      <div @click="jumpdetails(item.id)"><img :src="item.image" alt="" /></div>
      <div class="msg" @click="jumpdetails(item.id)">
        <div class="name">{{ item.name }}</div>
        <div class="price">
          <span class="newprice">￥{{ item.present_price }}</span>
          <span class="oldprice">{{ item.orl_price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Classification",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      listid: [],
      arr: [],
      product: [],
      number: 0,
      activeKey: 0,
      active: 0,
      goodslist: {},
      mallSubId: "",
      flages: 0
      // activeName: "a"
    };
  },
  methods: {
    //拿分类组件数据
    async getlist() {
      try {
        let res = await this.$api.recommend();
        //定义list接收数据
        this.list = res.data.category;
        this.arr = this.list[0].bxMallSubDto;
        this.mallSubId = this.arr[0].mallSubId;
        this.getid(this.mallSubId);
        if (this.flages === 9527) {
          this.goodslist = this.$route.query.item;
          // console.log(this.goodslist, "this.goodslist");
          this.number = this.goodslist.mallCategoryId - 1;
          // console.log(this.number, "number");
          this.send(this.number);
        }
        // console.log(res, 11, );
        // console.log(this.list, "1312354");
        // console.log(this.arr, "aaaaaaaaaaaaa");
        // console.log(this.mallSubId, "5432453sdzgsz");
      } catch (e) {
        console.log(e);
      }
    },
    async getid(id) {
      try {
        let res = await this.$api.category(id);
        //定义list接收数据
        this.listid = res;
        // console.log(this.listid, "bbbbbbbbbbbb");
      } catch (e) {
        console.log(e);
      }
    },
    send(index) {
      this.arr = this.list[index].bxMallSubDto;
      this.number = index;
      this.active = 0;
      this.getid(this.arr[0].mallSubId);
    },
    // getproduct(index) {
    //   this.product = this.arr[index].mallCategoryId;
    // }
    jumpdetails(id) {
      this.$router.push({
        name: "goodsDetails",
        query: { id: id }
      });
    }
  },
  mounted() {
    this.getlist();
    this.flages = this.$route.query.flages;
    // console.log(this.flages);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.classification {
  width: 100%;
  /*height: 100vh;*/
  background: white;
  padding-bottom: 60px;
}
.top {
  border-bottom: 1px solid #f2f2f2;
  position: fixed;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: white;
  z-index: 9;
  top: 0;
  border-bottom: 1px solid #f2f2f2;
}
.list {
  position: fixed;
  top: 36px;
  left: 0;
  height: 100vh;
  background: #dbfffc;
  .word {
    padding: 15px 10px;
    border-bottom: 1px solid #f2f2f2;
    &:hover {
      background: white;
    }
  }
}
.menu {
  background: white;
  width: 76%;
  margin: 0 auto;
  position: fixed;
  top: 36px;
  left: 86px;
  z-index: 99;
  /*margin-left: 10px;*/
}
.goods {
  width: 76%;
  position: relative;
  top: 82px;
  left: 23%;
  border-bottom: 1px solid #f2f2f2;
  padding: 5px 0;
  background: white;
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  color: red;
  /*background: #1aad19;*/
  /*margin-bottom: 56px;*/
  .price {
    margin-top: 30px;
  }
  .newprice {
    font-weight: bold;
  }
  .oldprice {
    font-size: 12px;
    color: #b2b2b2;
    margin-left: 10px;
    text-decoration: line-through;
  }
  .msg {
    width: 150px;
    padding-top: 10px;
  }
  img {
    width: 100px;
    border: 1px solid #f2f2f2;
    /*margin-left: 5px;*/
  }
}
.bgcolor {
  background: white;
}
</style>
