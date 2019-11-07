import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./http";
import dayjs from "dayjs";
import axios from "axios";
import api from "./http/api";
import Vant from "vant";
import "vant/lib/index.css";
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Notify } from 'vant';

Vue.use(Notify);
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Vant);
Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.prototype.$axios = http;
Vue.prototype.$dayjs = dayjs;

// 响应拦截
axios.defaults.timeout = 10000; // 设置超时时间
// 过滤请求结果 只返回结果的data
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
