<template>
  <div class="all">
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">地址列表</div>
    </div>
    <div v-if="areaList.length > 0">
      <div class="detail" v-for="(item, index) in areaList" :key="index">
        <div class="lft">
          <div class="choose" @click="chooseaddress(item)">
            <div v-if="item.isDefault === false">
              <van-icon name="circle" />
            </div>

            <div v-if="item.isDefault === true">
              <van-icon color="red" name="checked" />
            </div>
          </div>
          <div class="adress">
            <div class="adresstop">
              <div class="name">{{ item.name }}</div>
              ，
              <div class="tel">{{ item.tel }}</div>
            </div>
            <div class="adressbottom">
              {{ item.province + item.city + item.county + item.addressDetail }}
            </div>
          </div>
        </div>

        <div class="edit">
          <van-icon @click="onEdit(item)" name="edit" />
        </div>
      </div>
    </div>
    <div class="null" v-else>暂时没有收货地址</div>
    <div class="bottom">
      <van-button @click="onAdd" type="danger" size="large"
        >新增地址</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AdressList",
  components: {},
  props: {},
  data() {
    return {
      chosenAddressId: "1",
      areaList: [
        {
          id: "",
          name: "",
          tel: "",
          address: ""
        }
      ],
      rst: false,
      flag: 0
    };
  },
  methods: {
    //查询用户收货地址
    async getAddress() {
      try {
        let res = await this.$api.getAddress();
        // console.log(res);
        this.areaList = res.address;
        // console.log(this.areaList, "areaList");
      } catch (e) {
        console.log(e);
      }
    },
    //新增地址
    onAdd() {
      this.$router.push("/addressManagement");
    },
    //编辑地址
    onEdit(item) {
      this.$router.push({ name: "addressManagement", query: { item } });
      // this.$Toast("编辑地址:" + index);
    },
    //返回图标
    back() {
      this.$router.go(-1);
    },
    // 结算页面选择地址
    chooseaddress(item) {
      this.$router.push({
        name: "settlement",
        query: { item },
        flag: this.flag
      });
    }
  },
  mounted() {
    this.getAddress();
    this.flag = this.$route.query.flag;
    console.log(this.flag);
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
  min-height: 95vh;
  background: white;
  margin-bottom: 8vh;
  margin-top: 7vh;
}
.top {
  width: 100%;
  height: 50px;
  display: flex;
  position: fixed;
  top: 0;
  background: white;
  z-index: 9;
  /*border-bottom: 1px solid #f2f2f2;*/
  align-items: center;
  /*justify-content: center;*/
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
.title {
  display: flex;
  align-items: center;
  position: fixed;
  left: 42%;
}
.detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  height: 8vh;
  background: white;
  border-bottom: 1px solid #f2f2f2;
}
.lft {
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 14px;
  /*图标*/
  .choose {
    margin-right: 8px;
  }
  /*名字+电话号码+详细地址*/
  .adress {
    /*名字+电话号码*/
    .adresstop {
      display: flex;
      margin-bottom: 7px;
      /*名字*/
      .name {
      }
      /*电话号码*/
      .tel {
      }
    }
    /*详细地址*/
    .adressbottom {
    }
  }
}
.bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 9;
}
.null {
  text-align: center;
  padding-top: 45px;
}
</style>
