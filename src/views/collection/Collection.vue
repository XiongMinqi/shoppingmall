<template>
  <div class="all">
    <!--    头部-->
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">商品收藏</div>
    </div>
    <!--    收藏商品-->
    <div v-if="list.length > 0">
      <div class="collection" v-for="(item, index) in list" :key="index">
        <div class="msg">
          <div class="img"><img :src="item.image_path" alt="" /></div>
          <div class="goodsmsg">
            <div class="name">{{ item.name }}</div>
            <div class="price">￥{{ item.present_price }}</div>
          </div>
        </div>
        <div><van-icon @click="shoucang1(item.cid)" name="close" /></div>
      </div>
    </div>
    <div class="word" v-else>暂时没有收藏商品</div>
  </div>
</template>

<script>
export default {
  name: "Collection",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getCollection() {
      try {
        let res = await this.$api.getCollection();
        this.list = res.data.list;
        // console.log(res);
        // console.log(this.list, "list");
      } catch (e) {
        console.log(e);
      }
    },
    //取消收藏
    async shoucang1(cid) {
      this.shoucang = 0;
      this.iconname = "like-o";
      try {
        let res = await this.$api.cancelCollection(cid);
        this.$toast.success(res.msg);
        this.getCollection();
        // console.log(res);
      } catch (e) {
        this.$toast.fail(e.msg);
        console.log(e);
      }
    }
  },
  mounted() {
    this.getCollection();
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
.collection {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #f2f2f2;
  padding: 10px;
}
.msg {
  display: flex;
  align-items: center;
}
.img {
  width: 90px;
  height: 90px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
.goodsmsg {
  font-size: 14px;
}
.name {
}
.price {
  color: red;
  margin-top: 25px;
}
.word {
  text-align: center;
  margin-top: 45px;
}
</style>
