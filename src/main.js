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
import { Swipe, SwipeItem } from "vant";
import { Lazyload } from "vant";
import { Notify } from "vant";
import { Popup } from "vant";
import { AddressEdit } from "vant";
import { DatetimePicker } from "vant";
import { Stepper } from "vant";
import { Toast } from "vant";
import { Sku } from "vant";
import { ContactCard } from "vant";
import { ContactList } from "vant";
import { ContactEdit } from "vant";
import { Rate } from "vant";
import { Field } from "vant";
import { Switch } from "vant";
import { Tab, Tabs } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Switch);
Vue.use(Field);
Vue.use(Rate);
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);
Vue.use(Sku);
Vue.use(Toast);
Vue.use(Stepper);
Vue.use(DatetimePicker);
Vue.use(AddressEdit);
Vue.use(Popup);
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
