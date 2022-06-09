import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import AboutView from "../views/AboutView.vue";
import ReferView from "../views/ReferView.vue";
import MovieView from "../views/MovieView.vue";
import YoutubeView from "../views/YoutubeView.vue";
import PortfolioView from "../views/PortfolioView.vue";
import ContactView from "../views/ContactView.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: MainView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/reference",
    name: "Reference",
    component: ReferView,
  },
  {
    path: "/movie",
    name: "Movie",
    component: MovieView,
  },
  {
    path: "/youtube",
    name: "Youtube",
    component: YoutubeView,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: PortfolioView,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
