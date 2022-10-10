import UIDVue from "@/views/UID.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AddBuildVue from "@/views/AddBuild.vue";
import ShowcaseVue from "@/views/Showcase.vue";
import ExploreVue from "@/views/Explore.vue";
import ShowBuildVue from "@/views/ShowBuild.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path:"/explore/build",
      name:"explore",
      component: ExploreVue,
    },
    {
      path: "/u/:uid",
      name: "userUID",
      component: UIDVue,
      props: true,
    },
    {
      path: "/add/:uid",
      name: "addBuild",
      component: AddBuildVue,
      props: true,
    },
    {
      path: "/showcase/:uid",
      name: "showcase",
      component: ShowcaseVue,
      props: true,
    },
    {
      path: "/build/:id",
      name: "build",
      component: ShowBuildVue,
      props: true,
    },
  ],
});

export default router;
