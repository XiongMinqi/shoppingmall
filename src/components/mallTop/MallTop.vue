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
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
          background="#f2f2f2"
          @focus="sousuo"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MallTop",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      city: "",
      num: 1
    };
  },
  methods: {
    onSearch() {},
    getcity() {
      this.$router.push("/position");
    },
    sousuo() {
      this.$emit("sousuo", this.num);
      // this.$store.state.num=this.num
    }
  },
  mounted() {
    let _this = this;
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB"
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        _this.city = data.addressComponent.city;
        //在这里用不了this，要用_this
        _this.$store.state.cityname = _this.city;
        // console.log(_this.$store.state.cityname, 12345623165432);
        // console.log(data);
        // data是具体的定位信息
      }

      function onError(data) {
        // 定位出错
      }
    });
  },
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
