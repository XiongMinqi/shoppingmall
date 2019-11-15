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
          @search="onSearch(value)"
          background="#f2f2f2"
          @focus="sousuo"
        >
          <div v-if="number === 0" slot="action" @click="sousuo">搜索</div>
          <div v-if="number === 1" slot="action" @click="cancel">取消</div>
        </van-search>
      </div>
      <!--弹出层-->
      <div>
        <van-popup
          v-model="show"
          position="bottom"
          :overlay="false"
          :style="{ height: '92%', width: '100%' }"
        >
          <div v-if="value !== ''">
            <div class="goods" v-for="(item, index) in list" :key="index">
              <div @click="jump(item.id)" v-html="item.name"></div>
            </div>
          </div>
          <!--搜索历史-->
          <div v-if="histories && value === ''">
            <div class="historytitle">
              <div>搜索历史</div>
              <div @click="deletehistory">
                清空历史<van-icon name="delete" />
              </div>
            </div>
            <div class="historyname">
              <div v-for="(item, index) in histories" :key="index">
                <van-tag @click="postvalue(item)" size="large" plain>
                  {{ item }}
                </van-tag>
              </div>
            </div>
          </div>
          <div class="else" v-else-if="this.histories === null">
            暂时没有搜索历史
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
// import keyword from "../../../public/util";
export default {
  name: "MallTop",
  components: {},
  props: {},
  data() {
    return {
      number: 0,
      value: "",
      city: "",
      num: 1,
      show: false,
      list: [],
      keyword: {},
      history: [],
      histories: []
    };
  },
  methods: {
    //搜索商品
    async onSearch(value) {
      try {
        let res = await this.$api.search(value, 1);
        this.list = res.data.list;
        // 将搜索关键词存入localStorage
        if (this.histories === null) {
          this.history.unshift(this.value);
          localStorage.setItem("history", JSON.stringify(this.history));
        } else if (
          this.histories &&
          this.histories.length <= 6 &&
          this.value !== ""
        ) {
          if (this.histories.indexOf(this.value) === -1) {
            this.history.unshift(this.value);
          }
          localStorage.setItem("history", JSON.stringify(this.history));
        } else if (
          this.histories &&
          this.histories.length > 6 &&
          this.value !== ""
        ) {
          if (this.histories.indexOf(this.value) === -1) {
            this.history.pop();
            this.history.unshift(this.value);
          }
          localStorage.setItem("history", JSON.stringify(this.history));
        }
        // //从localStorage里获取搜索历史
        this.histories = JSON.parse(localStorage.getItem("history"));
        // console.log(this.histories, "histories");
        //    搜索关键词高亮显示
        //    @param String str 要替换的关键词
        //    @param String value 搜索框里面的内容
        //    @return Function 替换后的内容
        this.list.map(item => {
          let replaceReg = new RegExp(this.value, "g");
          let replaceString = `<span style='color:red'>${this.value}</span>`;
          item.name = item.name.replace(replaceReg, replaceString);
          return item.name;
        });
        // console.log(res);
        // console.log(this.list);
      } catch (e) {
        console.log(e);
      }
    },
    //点击给input框赋值
    postvalue(item) {
      this.value = item;
      this.onSearch(item);
    },
    getcity() {
      this.$router.push("/position");
    },
    sousuo() {
      this.show = true;
      this.number = 1;
    },
    cancel() {
      this.show = false;
      this.number = 0;
      this.value = "";
      // this.onSearch();
    },
    //跳转商品详情
    jump(id) {
      this.$router.push({
        name: "goodsDetails",
        query: { id: id }
      });
    },
    //清空历史
    deletehistory() {
      this.history = [];
      localStorage.removeItem("history");
      this.histories = null;
    }
  },
  mounted() {
    //从localStorage里获取搜索历史
    this.histories = JSON.parse(localStorage.getItem("history"));
    // console.log(this.histories, "histories");
    if (this.histories) {
      this.history = this.histories;
    } else {
      this.history = [];
    }
    let cityindex = this.$route.query.cityindex;
    if (cityindex === 12138) {
      this.city = this.$route.query.name;
      // console.log(this.city, "this.cityname");
    } else {
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
    }
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
  width: 70%;
  /*width: 200px;*/
  background: #f7f8fa;
}
.van-search--show-action {
  background: white;
}
.goods {
  padding: 15px;
  font-size: 15px;
  border-bottom: 1px solid #f2f2f2;
}
.historyname {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
  align-items: center;
  div {
    width: 30%;
    margin-bottom: 15px;
    text-align: center;
  }
}
.historytitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  div {
    display: flex;
    align-items: center;
  }
}
.else {
  text-align: center;
  margin-top: 20px;
}
</style>
