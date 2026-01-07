import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Biseksi from "../pages/Biseksi.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/biseksi",
    component: Biseksi,
  },
  {},
  {},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
