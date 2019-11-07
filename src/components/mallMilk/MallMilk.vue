<template>
  <div class="food">
    <div class="top">
      <div class="symbol">3F</div>
      <div>{{ name }}</div>
    </div>
    <div class="product">
      <div class="first">
        <div class="left one" v-if="list[0]" @click="jump1(list[0].goodsId)">
          <img :src="list[0].image" alt="" />
        </div>
        <div class="right">
          <div class="two" v-if="list[1]" @click="jump1(list[1].goodsId)">
            <img :src="list[1].image" alt="" />
          </div>
          <div class="three" v-if="list[2]" @click="jump1(list[2].goodsId)">
            <img :src="list[2].image" alt="" />
          </div>
        </div>
      </div>

      <div class="second">
        <div class="four" v-if="list[3]" @click="jump1(list[3].goodsId)">
          <img :src="list[3].image" alt="" />
        </div>
        <div class="five" v-if="list[4]" @click="jump1(list[4].goodsId)">
          <img :src="list[4].image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MallMilk",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      name: ""
    };
  },
  methods: {
    //营养奶品
    async getproduct() {
      try {
        let res = await this.$api.recommend();
        //定义list接收数据
        this.list = res.data.floor3;
        //定义name接收楼名
        this.name = res.data.floorName.floor3;
        // console.log(res, 11111111);
        // console.log(this.list, 222222222222);
      } catch (e) {
        console.log(e);
      }
    },
    jump1(id) {
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
.food {
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
.symbol {
  color: white;
  background: red;
  border-radius: 50%;
}
.product {
  width: 100%;
  background: white;
  /*display: flex;*/
  div {
    border: 1px solid #f2f2f2;
  }
}
.first {
  width: 100%;
  display: flex;
  .one {
    width: 50%;
    /*height: 200px;*/
    /*background: skyblue;*/
  }
  .two {
    width: 100%;
    /*height: 100px;*/
    /*background: #1aad19;*/
  }
  .three {
    width: 100%;
    /*height: 100px;*/
    /*background: #5b7492;*/
  }
}
.second {
  display: flex;
}
.four {
  width: 50%;
  /*height: 100px;*/
  /*background: #555555;*/
}
.five {
  width: 50%;
  /*height: 100px;*/
  /*background: #e6057f;*/
}
.right {
  width: 50%;
}
img {
  width: 100%;
}
</style>
