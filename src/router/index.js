import {
  createWebHistory,
  createRouter
} from "vue-router";
import HomePage from "@/views/pages/home/HomePage.vue";
import WeatherApp from "@/views/pages/weather-app/WeatherApp.vue";

const routes = [{
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/weather",
    name: "WeatherApp",
    component: WeatherApp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;