<template>
  <div class="hot">
    <div class="top">
      <div>热销商品</div>
    </div>

    <div class="product">
      <div class="goods" v-for="(item, index) in list" :key="index">
        <div @click="jumpdetails(item.goodsId)">
          <div class="img"><img :src="item.image" alt="" /></div>
          <div class="word">{{ item.name }}</div>
          <div class="price">
            <span>￥{{ item.price }}</span>
            <span class="jiage">￥{{ item.mallPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MallHot",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    //热销商品
    async getproduct() {
      try {
        let res = await this.$api.recommend();
        //定义list接收数据
        this.list = res.data.hotGoods;
        // console.log(res, 11111111);
        // console.log(this.list, 222222222222);
      } catch (e) {
        console.log(e);
      }
    },
    jumpdetails(id) {
      this.$router.push({
        name: "goodsDetails",
        query: { id: id }
      });
    }
  },
  mounted() {
    this.getproduct();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.hot {
  width: 98%;
  margin: 0 auto;
  margin-top: 15px;
}
.top {
  display: flex;
  justify-content: center;
  color: red;
  margin-bottom: 15px;
}
.product {
  display: flex;
  flex-wrap: wrap;
  .goods {
    background: white;
    padding-bottom: 15px;
    width: 49%;
    border: 1px solid #f2f2f2;
    .img {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .word {
      padding-left: 5px;
      height: 20px;
      color: red;
      /*display: inline-block;*/
      /*width: 350px;*/
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
    .jiage {
      padding-left: 10px;
      font-size: 12px;
      text-decoration: line-through;
      color: #b2b2b2;
    }
    .price {
      color: red;
      text-align: center;
    }
  }
}
</style>
