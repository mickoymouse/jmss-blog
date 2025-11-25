import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("@/views/Home.vue"),
    },
    {
      name: "blog",
      path: "/blog",
      component: () => import("@/views/Blog.vue"),
    },
    {
      name: "about",
      path: "/about",
      component: () => import("@/views/About.vue"),
    },
    {
      name: "newsletter",
      path: "/newsletter",
      component: () => import("@/views/Newsletter.vue"),
    },
  ],
});

export default router;
