import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Biseksi from "../pages/Biseksi.vue";
import NewtonRhapson from "../pages/NewtonRhapson.vue";
import Secant from "../pages/Secant.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/biseksi",
    name: "Biseksi",
    component: Biseksi,
  },
  {
    path: "/newton",
    name: "Newton",
    component: NewtonRhapson,
  },
  {
    path: "/secant",
    name: "Secant",
    component: Secant,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
