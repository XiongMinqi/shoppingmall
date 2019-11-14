<template>
  <div>
    <div class="top">
      <div class="icon" @click="back"><van-icon name="arrow-left" /></div>
      <div class="title">编辑地址</div>
    </div>
    <div>
      <van-address-edit
        :area-list="area"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        :address-info="item"
      />
    </div>
  </div>
</template>

<script>
import area from "../../../public/area";
export default {
  name: "AddressManagement",
  components: {},
  props: {},
  data() {
    return {
      area,
      item: {},
      searchResult: []
    };
  },
  methods: {
    //上传地址
    async onSave(content) {
      //新增地址
      if (this.item === undefined) {
        try {
          let res = await this.$api.postAddress({ ...content });
          console.log(res);
          if (res.code === 200) {
            this.$toast.success(res.msg);
            this.$router.push("/adressList");
          } else {
            this.$toast.fail(res.msg);
          }
        } catch (e) {
          console.log(e);
        }
      }
      //编辑地址
      else {
        try {
          this.$set(content, "id", this.item._id); // 创建属性.将this.item._id赋值给新创建属性id
          let res = await this.$api.postAddress({ ...content });
          // console.log(res);
          if (res.code === 200) {
            this.$toast.success(res.msg);
            this.$router.push("/adressList");
          } else {
            this.$toast.fail(res.msg);
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    //删除地址
    async onDelete(id) {
      try {
        let res = await this.$api.deleteAddress(id);
        console.log(res, "删除地址");
        this.$toast(res.msg);
        this.item = {};
        this.$router.push("/adressList");
      } catch (e) {
        console.log(e);
      }
    },
    //编辑地址
    // async setDefaultAddress(id) {
    //   try {
    //     let res = await this.$api.setDefaultAddress(id);
    //     console.log(res, "编辑地址");
    //     // this.$toast(res.msg);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // onChangeDetail(val) {
    //   if (val) {
    //     this.searchResult = [
    //       {
    //         name: "",
    //         address: ""
    //       }
    //     ];
    //   } else {
    //     this.searchResult = [];
    //   }
    // },
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.item = this.$route.query.item;
    // console.log(this.item);
    // if (this.item === this.$route.query.item) {
    //   this.id = this.$route.query.item._id;
    //   console.log(this.id);
    // } else {
    //   this.id = "";
    // }

    // this.setDefaultAddress();
    // this.areaList = area;
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
</style>
