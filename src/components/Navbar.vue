<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import DarkIcon from "@/icons/icon-moon.svg";
import LightIcon from "@/icons/icon-sun.svg";
import { useTheme } from "@/composables/Theme";

const { isDarkMode, toggleTheme } = useTheme();

const routes = [
  {
    name: "Home",
    routeName: "home",
  },
  {
    name: "Blog",
    routeName: "blog-list",
    matchNames: ["blog-list", "blog-detail"],
  },
  {
    name: "About",
    routeName: "about",
  },
  {
    name: "Newsletter",
    routeName: "newsletter",
  },
];
const route = useRoute();

const links = ref<HTMLElement[]>([]);
const navActiveStyle = ref({
  width: "0px",
  left: "0px",
});

const updateNavActiveStyle = () => {
  const idx = routes.findIndex(
    (r) =>
      r.routeName === route.name || (r.matchNames && r.matchNames.includes(route.name as string))
  );
  if (idx === -1 || !links.value[idx]) return;
  const el = links.value[idx].querySelector("a");
  if (!el) return;

  links.value.forEach((link) => {
    link.querySelector("a")?.classList.remove("active");
  });

  el.classList.add("active");

  navActiveStyle.value = {
    width: el.offsetWidth + "px",
    left: el.offsetLeft + "px",
  };
};

watch(
  () => route.name,
  () => {
    nextTick(updateNavActiveStyle);
  },
  { immediate: true }
);

onMounted(() => {
  nextTick(() => {
    updateNavActiveStyle();
  });
});
</script>

<template>
  <header
    class="h-[52px] flex items-center justify-between p-2 rounded-md max-w-[640px] min-w-[640px] border-2 border-(--border-color) bg-(--nav-bg) mt-5"
  >
    <img src="@/assets/me.jpg" alt="judge micko's image" class="h-10 w-10 rounded-md" />
    <nav class="flex gap-4 items-center">
      <ul class="flex gap-6 relative">
        <div v-for="r in routes" :key="r.name" class="flex flex-col" ref="links">
          <RouterLink class="nav-link" :to="{ name: r.routeName }" tag="li">{{
            r.name
          }}</RouterLink>
        </div>
        <span
          :style="navActiveStyle"
          class="h-1 bg-(--blue-500) absolute bottom-0 transition-all duration-300"
          aria-hidden="true"
        ></span>
      </ul>
      <button
        class="border-2 border-(--border-color) bg-(--background) p-2 rounded-md cursor-pointer"
        @click="toggleTheme"
      >
        <DarkIcon v-if="!isDarkMode" />
        <LightIcon v-else />
      </button>
    </nav>
  </header>
</template>
