import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "home",
    // component: Home
    redirect: "/mall"
  },
  {
    path: "/position",
    name: "position",
    component: () => import("../views/position/Position"),
    meta: {
      title: "城市列表"
    }
  },
  {
    path: "/addressManagement",
    name: "addressManagement",
    component: () => import("../views/addressManagement/AddressManagement"),
    meta: {
      title: "地址管理"
    }
  },
  {
    path: "/collection",
    name: "collection",
    component: () => import("../views/collection/Collection"),
    meta: {
      title: "商品收藏"
    }
  },
  {
    path: "/evaluation",
    name: "evaluation",
    component: () => import("../views/evaluation/Evaluation"),
    meta: {
      title: "评价中心"
    }
  },
  {
    path: "/goodsDetails",
    name: "goodsDetails",
    component: () => import("../views/goodsDetails/GoodsDetails"),
    meta: {
      title: "商品详情"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login"),
    meta: {
      title: "登录注册"
    }
  },
  {
    path: "/myOrder",
    name: "myOrder",
    component: () => import("../views/myOrder/MyOrder"),
    meta: {
      title: "我的订单"
    }
  },
  {
    path: "/recentBrowse",
    name: "recentBrowse",
    component: () => import("../views/recentBrowse/RecentBrowse"),
    meta: {
      title: "最近浏览"
    }
  },
  {
    path: "/settlement",
    name: "settlement",
    component: () => import("../views/settlement/Settlement"),
    meta: {
      title: "订单结算"
    }
  },
  {
    path: "/personalData",
    name: "personalData",
    component: () => import("../views/personalData/PersonalData"),
    meta: {
      title: "个人资料"
    }
  },
  {
    path: "/mall",
    component: Home,
    children: [
      {
        path: "",
        name: "mall",
        component: () => import("../views/mall/Mall")
      }
    ]
  },
  {
    path: "/classification",
    component: Home,
    children: [
      {
        path: "",
        name: "classification",
        component: () => import("../views/classification/Classification"),
        meta: {
          title: "分类"
        }
      }
    ]
  },
  {
    path: "/shoppingcart",
    component: Home,
    children: [
      {
        path: "",
        name: "shoppingcart",
        component: () => import("../views/shoppingcart/Shoppingcart"),
        meta: {
          title: "购物车"
        }
      }
    ]
  },
  {
    path: "/mine",
    component: Home,
    children: [
      {
        path: "",
        name: "mine",
        component: () => import("../views/mine/Mine"),
        meta: {
          title: "会员中心"
        }
      }
    ]
  }
];

//路由守卫
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title;
// let user = localStorage.getItem("user");
// if (to.path === "/login" || to.path === "/registered") {
//   next();
// } else {
//   user ? next() : next("/login");
// }
// });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
