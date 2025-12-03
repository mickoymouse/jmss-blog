<script setup lang="ts">
import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import PatternLight from "@/assets/pattern-light.svg";
import PatternDark from "@/assets/pattern-dark.svg";
import { useTheme } from "@/composables/Theme";

const { isDarkMode } = useTheme();
</script>

<template>
  <div class="relative flex flex-col h-screen w-full items-center">
    <div class="flex justify-center">
      <Navbar />
    </div>
    <PatternLight v-if="!isDarkMode" class="absolute top-0 right-0 translate-x-1/2 -z-5" />
    <PatternDark v-else class="absolute top-0 right-0 translate-x-1/2 -z-5" />
    <PatternLight
      v-if="!isDarkMode"
      class="absolute top-0 left-0 translate-y-1/2 -translate-x-1/2 -z-5"
    />
    <PatternDark v-else class="absolute top-0 left-0 translate-y-1/2 -translate-x-1/2 -z-5" />
    <main
      class="h-[calc(100vh-52px)] max-w-[630px] w-full border-l-2 border-r-2 border-b-2 border-(--border-color) px-2"
    >
      <Simplebar class="h-[calc(100%-80px)]">
        <RouterView />
      </Simplebar>
      <Footer />
    </main>
  </div>
</template>

<style scoped></style>
