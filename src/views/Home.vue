<template>
  <div class="body">
    <div class="neirong"><router-view></router-view></div>
    <div class="bottom"><Bottom /></div>
  </div>
</template>

<script>
import Bottom from "../components/bottom/Bottom";
export default {
  name: "Home",
  components: { Bottom },
  props: {},
  data() {
    return {
      sum: 0
    };
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
/*.body{*/
/*  margin-bottom: 60px;*/
/*}*/
.neirong {
  margin-bottom: 60px;
}
.bottom {
  /*margin: 60px;*/
}
</style>
