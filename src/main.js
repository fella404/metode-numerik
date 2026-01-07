import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(Toast).mount("#app");
