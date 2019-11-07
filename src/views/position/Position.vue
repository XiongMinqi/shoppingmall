<template>
  <div>
    <div class="top">
      <span class="icon" @click="back"><van-icon name="arrow-left"/></span>
      <span class="city">城市列表</span>
    </div>
    <div>
      <van-search
        background="##f2f2f2"
        placeholder="请输入城市关键字"
        v-model="input"
      />
    </div>
    <div class="allcity">
      <!--      当前城市-->
      <div class="current">
        <div class="word">当前城市</div>
        <div class="city">
          <span class="dangqian">{{ name }}</span>
        </div>
      </div>
      <!--      热门城市-->
      <div class="hot">
        <div class="word">热门城市</div>
        <div class="back">
          <div
            class="city city2"
            v-for="(item, index) in list.hotCities"
            :key="index"
          >
            <div class="chengshi">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--    搜索城市-->
    <div class="citylist">
      <div class="listcity" v-if="input === ''">
        <van-index-bar>
          <div v-for="(item, index) in city" :key="index">
            <van-index-anchor :index="index" />
            <van-cell v-for="it in item" :title="it.name" :key="it.id" />
          </div>
        </van-index-bar>
      </div>
      <div v-if="input !== ''">
        <van-cell v-for="item in arr" :key="item.id">{{ item.name }}</van-cell>
      </div>
      <div v-if="arr.length === 0">你搜索的城市关键字有误，请确定关键字</div>
    </div>
  </div>
</template>

<script>
import data from "../../../public/city";
export default {
  name: "Position",
  components: {},
  props: {},
  data() {
    return {
      input: "",
      city: {},
      list: [],
      arr: [],
      name: ""
    };
  },
  methods: {
    // 跳转到首页
    back() {
      this.$router.back();
    }
  },
  mounted() {
    this.name = this.$store.state.cityname;
    // this.name = this.$store.state.cityname;
    // console.log(this.name, 111111);
    this.list = data.data;
    this.city = this.list.cities;
    // console.log(this.list, 1111111111);
    // let aa = this.list.data.hotCities;
    // console.log(aa, 444);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    input(val) {
      //说明输入框有值
      if (val.trim() !== "") {
        if (val.charCodeAt(0) >= 65 && val.charCodeAt(0) <= 90) {
          val = val.toLowerCase();
        }
        let arr1 = [];
        for (let i in this.city) {
          this.city[i].map(item => {
            if (item.name.includes(val) || item.spell.includes(val)) {
              arr1.push(item);
            }
            // return JSON.stringify(item).includes(val);
          });
        }
        this.arr = arr1;
      } else {
        this.arr = [];
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  padding: 10px;
  background: white;
  display: flex;
  justify-content: center;
}
.icon {
  position: absolute;
  left: 0;
}
.city {
  align-content: center;
}
.van-search__content {
  background: white;
}
.allcity {
  div {
    line-height: 45px;
  }
}
.word {
  padding-left: 8px;
  background: #f2f2f2;
}
.city {
  padding-left: 8px;
  background: white;
}
.back {
  width: 100%;
  background: white;
  padding: 10px 0;
  /*height: 100px;*/
  /*line-height: 100px;*/
}
.city2 {
  display: inline-block;
  width: 30%;
}
.chengshi {
  /*width: 20%;*/
  height: 40px;
  /*line-height: 40px;*/
  border: 1px solid #c2c2c2;
  text-align: center;
  /*margin-bottom: 10px;*/
  /*margin-right: 15px;*/
  /*padding: 5px 10px;*/
}
.hot {
  margin-bottom: 10px;
}
.dangqian {
  padding: 5px 10px;
  border: 1px solid #c2c2c2;
}
.listcity {
  /*line-height: 20px;*/
}
</style>
