<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import DarkIcon from "@/icons/icon-moon.svg";
import LightIcon from "@/icons/icon-sun.svg";
import { useTheme } from "@/composables/Theme";
import Menu from "@/icons/icon-menu.svg";
import MenuClose from "@/icons/icon-menu-close.svg";
import Divider from "@/components/ui/Divider.vue";

const isMenuOpen = ref(false);

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
    class="relative h-[52px] flex items-center justify-between p-2 rounded-md max-w-[calc(100%-16px)] md:max-w-[640px] w-full border-2 border-(--border-color) bg-(--nav-bg) mt-5"
  >
    <img src="@/assets/me.jpg" alt="judge micko's image" class="h-10 w-10 rounded-md" />
    <nav class="flex gap-4 items-center">
      <ul class="md:flex gap-6 relative hidden">
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
        class="flex items-center justify-center md:hidden cursor-pointer rounded-lg p-2 focus:outline-none"
        @click="() => (isMenuOpen = !isMenuOpen)"
        :class="{
          'bg-(--neutral-700) text-(--neutral-0) dark:bg-(--neutral-0) dark:text-(--neutral-700)':
            isMenuOpen,
        }"
      >
        <Menu v-if="!isMenuOpen" />
        <MenuClose v-else />
      </button>
      <ul
        :class="[
          'md:hidden absolute left-0 z-9999 -top-50 w-full bg-(--neutral-0) dark:bg-(--neutral-800) border-2 border-(--border-color) mt-4 rounded-[10px] p-4 transition-transform duration-300 ease-in-out',
          isMenuOpen ? 'translate-y-[calc(100%)]' : '-translate-y-[calc(100%-90px)]',
        ]"
      >
        <div
          v-for="(r, index) in routes"
          :key="r.name"
          class="flex flex-col text-6 gap-4 text-(--neutral-900) dark:text-(--neutral-0)"
          ref="links"
        >
          <RouterLink
            :class="{ 'mt-4': index != 0 }"
            class="nav-link"
            :to="{ name: r.routeName }"
            tag="li"
            >{{ r.name }}</RouterLink
          >
          <Divider v-if="index < routes.length - 1" />
        </div>
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
