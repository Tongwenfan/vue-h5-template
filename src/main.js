import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import "./reset.css";
import {  GetQueryValue1} from "@/utils/utils";
import VConsole from 'vconsole';
Vue.config.productionTip = false;
// 润工作-app入口 和微信小程序入口
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


/* eslint-disable */
// 真机测试控制台
if (GetQueryValue1("vconsole") !== null && GetQueryValue1("vconsole") ==='1') {
  new VConsole();
}

