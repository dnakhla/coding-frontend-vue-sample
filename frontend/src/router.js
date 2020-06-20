import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/:name",
      name: "details",
      component: () => import("@/views/Detail.vue"),
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});
