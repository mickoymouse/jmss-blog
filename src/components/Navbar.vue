<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import DarkIcon from "@/icons/icon-moon.svg";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Newsletter",
    path: "/newsletter",
  },
];
const route = useRoute();

const links = ref<HTMLElement[]>([]);
const navActiveStyle = ref({
  width: "0px",
  left: "0px",
});

const updateNavActiveStyle = () => {
  const idx = routes.findIndex((r) => r.path === route.path);
  if (idx === -1 || !links.value[idx]) return;
  const el = links.value[idx].querySelector("a");
  if (!el) return;

  navActiveStyle.value = {
    width: el.offsetWidth + "px",
    left: el.offsetLeft + "px",
  };
};

watch(() => route.path, updateNavActiveStyle);

onMounted(() => {
  updateNavActiveStyle();
});
</script>

<template>
  <header
    class="h-[52px] flex items-center justify-between p-2 rounded-md max-w-[640px] min-w-[640px] border-2 border-(--neutral-200) bg-(--neutral-0) mt-5"
  >
    <img src="@/assets/me.jpg" alt="judge micko's image" class="h-10 w-10 rounded-md" />
    <nav class="flex gap-4 items-center">
      <ul class="flex gap-6 relative">
        <div v-for="r in routes" :key="r.name" class="flex flex-col" ref="links">
          <RouterLink :to="r.path" tag="li">{{ r.name }}</RouterLink>
        </div>
        <span
          :style="navActiveStyle"
          class="h-1 bg-(--blue-500) absolute bottom-0 transition-all duration-300"
          aria-hidden="true"
        ></span>
      </ul>
      <button
        class="border-2 border-(--neutral-200) bg-(--neutral-100) p-2 rounded-md cursor-pointer"
      >
        <DarkIcon />
      </button>
    </nav>
  </header>
</template>
