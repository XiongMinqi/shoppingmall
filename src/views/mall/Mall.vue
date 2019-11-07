<template>
  <div>
    <div v-if="num === 0">
      <!--    顶部输入框-->
      <div class="top"><MallTop @sousuo="sousuo" /></div>
      <!--    轮播图-->
      <div class="shuffling"><Shuffling /></div>
      <!--    分类图片-->
      <div class="demo"><MallDemo /></div>
      <!--    推荐商品-->
      <div class="Recommendation"><Recommendation /></div>
      <!--    休闲食品-->
      <div class="MallFood"><MallFood /></div>
      <!--    新鲜水果-->
      <div class="MallFruit"><MallFruit /></div>
      <!--    营养奶品-->
      <div class="MallMilk"><MallMilk /></div>
      <!--    热销商品-->
      <div class="MallHot"><MallHot /></div>
    </div>
    <div v-else><Search /></div>
  </div>
</template>

<script>
import Search from "../../components/search/Search";
import MallTop from "../../components/mallTop/MallTop";
import Shuffling from "../../components/shuffling/Shuffling";
import MallDemo from "../../components/mallDemo/MallDemo";
import Recommendation from "../../components/recommendation/Recommendation";
import MallFood from "../../components/mallFood/MallFood";
import MallFruit from "../../components/mallFruit/MallFruit";
import MallMilk from "../../components/mallMilk/MallMilk";
import MallHot from "../../components/mallHot/MallHot";
export default {
  name: "Mall",
  components: {
    MallTop,
    Shuffling,
    MallDemo,
    Recommendation,
    MallFood,
    MallFruit,
    MallMilk,
    MallHot,
    Search
  },
  props: {},
  data() {
    return {
      num: 0
    };
  },
  methods: {
    sousuo(data) {
      console.log(data);
      this.num = data;
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.shuffling {
  margin-bottom: 10px;
}
.demo {
  margin-bottom: 10px;
}
.Recommendation {
}
.MallFood {
}
.MallFruit {
}
.MallMilk {
}
.MallHot {
}
</style>
