import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Patients from "../views/Patients.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/patients", component: Patients },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
