<template>
  <div>
    <div class="demo">
      <div class="tupian" v-for="(item, index) in list" :key="index">
        <div><img :src="item.image" alt="" /></div>
        <div class="word">{{ item.mallCategoryName }}</div>
      </div>
    </div>
    <!--    滑动图下面的图片-->
    <div class="peisong"><img :src="this.image" alt="" /></div>
  </div>
</template>

<script>
export default {
  name: "MallDemo",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      image: {}
    };
  },
  methods: {
    //拿滑动图数据
    async getpicture() {
      try {
        let res = await this.$api.recommend();
        this.list = res.data.category;
        //滑动图下面的图片
        this.image = res.data.advertesPicture.PICTURE_ADDRESS;
        // console.log(res, 22);
        // console.log(this.image, 111);
      } catch (e) {
        console.log(e);
      }
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
.demo {
  padding: 10px;
  width: 93%;
  margin: 0 auto;
  border-radius: 10px;
  background: white;
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-bottom: 10px;
}

img {
  width: 45px;
  /*height: ;*/
}
.word {
  margin-top: 5px;
}
.peisong {
  width: 93%;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
</style>
