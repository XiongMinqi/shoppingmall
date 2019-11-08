<template>
  <div class="shuffling">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <img @click="product(item.goodsId)" v-lazy="item.image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Shuffling",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    //拿轮播图的图片
    async getpicture() {
      try {
        let res = await this.$api.recommend();
        //定义list接收轮播图的图片
        this.list = res.data.slides;
        // console.log(res, 1111111111111111);
        // console.log(this.list, "轮播图");
      } catch (e) {
        console.log(e);
      }
    },
    product(id) {
      this.$router.push({ name: "goodsDetails", query: { id: id } });
    }
  },
  mounted() {
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
.shuffling {
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
  height: 160px;
  background: white;
  margin-top: 55px;
}
img {
  width: 100%;
}
</style>
