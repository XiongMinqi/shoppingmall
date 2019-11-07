<template>
  <div>
    <div class="top">
      <div @click="getcity">
        <div class="local" v-if="city">
          <van-icon name="location" />{{ city }}
        </div>
        <div v-else>定位中</div>
      </div>
      <div class="shuru">
        <form action="/">
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            background="#f2f2f2"
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
        <!--        <van-search-->
        <!--          v-model="value"-->
        <!--          placeholder="请输入搜索关键词"-->
        <!--          show-action-->
        <!--          shape="round"-->
        <!--          @search="onSearch"-->
        <!--          background="#f2f2f2"-->
        <!--          @focus="sousuo"-->
        <!--        >-->
        <!--          <div slot="action" @click="onSearch">搜索</div>-->
        <!--        </van-search>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      city:""
    };
  },
  methods: {
    onSearch() {},
    onCancel() {},
    getcity() {
      this.$router.push("/position");
    },
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
.top {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9;
  /*margin-bottom: 30px;*/
  background: #f2f2f2;
  /*padding: 5px;*/
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.local {
  display: flex;
  align-items: center;
  /*width: 15%;*/
}
.shuru {
  /*width: 85%;*/
  background: #f7f8fa;
}
.van-search--show-action {
  background: white;
}
</style>
