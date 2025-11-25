<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import PatternLight from "@/assets/pattern-light.svg";
</script>

<template>
  <div class="relative flex flex-col h-screen w-full items-center">
    <div class="flex justify-center">
      <Navbar />
    </div>
    <PatternLight class="absolute top-0 right-0 translate-x-1/2 -z-5" />
    <PatternLight class="absolute top-0 left-0 translate-y-1/2 -translate-x-1/2 -z-5" />
    <main
      class="h-[calc(100vh-52px)] max-w-[630px] w-full border-l-2 border-r-2 border-b-2 border-(--neutral-200) px-2"
    >
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
