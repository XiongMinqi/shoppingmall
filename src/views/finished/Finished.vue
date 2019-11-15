<template>
  <div class="all">
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">全部订单</div>
    </div>
    <!--      标签页-->
    <div class="label">
      <!--      <div class="leimu">-->
      <!--        <div>全部</div>-->
      <!--        <div>待支付</div>-->
      <!--        <div>待发货</div>-->
      <!--        <div>待收货</div>-->
      <!--        <div>已完成</div>-->
      <!--      </div>-->
      <van-tabs v-model="active">
        <van-tab title="全部">
          <div>全部</div>
        </van-tab>
        <van-tab title="待支付">
          <div>待支付</div>
        </van-tab>
        <van-tab title="待发货">
          <div>待发货</div>
        </van-tab>
        <van-tab title="待收货">
          <div>待收货</div>
        </van-tab>
        <van-tab title="已完成">
          <div class="finished">
            <div
              class="finishedgoods"
              v-for="(item, index) in list"
              :key="index"
            >
              <div
                class="number"
                v-for="(goodsitem, goodsindex) in item.order_list"
                :key="goodsindex"
              >
                <div class="ordernumber">
                  <div>订单编号：{{ goodsitem.order_id }}</div>
                  <div style="color: #d2591b">交易完成</div>
                </div>
                <div class="goodsmsg">
                  <div class="goodsdetails">
                    <div class="goodsimg">
                      <img :src="goodsitem.image_path" alt="" />
                    </div>
                    <div class="goodsname">{{ goodsitem.name }}</div>
                  </div>
                  <div class="goodsprice">
                    <div class="price">￥{{ goodsitem.mallPrice }}</div>
                    <div class="count">X{{ goodsitem.count }}</div>
                  </div>
                </div>
              </div>

              <div class="usermsg">
                <div>创建时间:{{ item.add_time }}</div>
                <div>收货地址：{{ item.address }}</div>
                <div>
                  共{{ item.order_list.length }}件商品 合计{{
                    item.mallPrice | Tofixed
                  }}
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Finished",
  components: {},
  props: {},
  data() {
    return {
      active: 4,
      list: [],
      goodslist: [],
      ordernumber: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getMyOrder() {
      try {
        let res = await this.$api.getMyOrder();
        this.list = res.list;
        this.list.map(item => {
          this.goodslist.push(item.order_list);
          // if (this.goodslist.length > 1) {
          //   this.goodslist.map(item => {
          //     item.order_id = item[0].order_id;
          //   });
          // }
        });

        console.log(res);
        console.log(this.list, "list");
        console.log(this.goodslist, "goodslist");
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getMyOrder();
  },
  created() {},
  filters: {
    Tofixed: function(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  width: 100%;
  min-height: 100vh;
  /*background: white;*/
}
.top {
  height: 50px;
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 9;
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
.label {
  /*width: 100%;*/
  padding-top: 50px;
  background: white;
  /*padding: 10px;*/
}
.finished {
  /*margin-top: 10px;*/
  background: #f2f2f2;
}
.finishedgoods {
  background: white;
  margin: 10px;
  border-radius: 10px;
  padding: 10px 10px 0 10px;
}
.usermsg {
  text-align: right;
  font-size: 14px;
  padding-top: 10px;
  div {
    padding-bottom: 10px;
  }
}
.ordernumber {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f2f2;
}
.goodsmsg {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f2f2f2;
}
.goodsdetails {
  width: 95%;
  display: flex;
}
.goodsimg {
  width: 80px;
  height: 80px;
  margin-right: 5px;
  img {
    width: 90%;
    height: 90%;
    border: 1px solid #f2f2f2;
  }
}
.goodsprice {
  text-align: right;
}
</style>
