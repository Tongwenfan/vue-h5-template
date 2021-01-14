import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";

Vue.use(VueRouter);
const routes = [
  // 客服顾问
  {
    path: "/",
    name: "首页",
    component: index,
  },

 
];

const router = new VueRouter({
  routes,
  mode:'hash'
  
  
});

Vue.prototype.$lastURL = null;





router.beforeEach((to, from, next) => { 
  next();
});






export default router;
