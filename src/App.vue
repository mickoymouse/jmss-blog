<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import PatternLight from "@/assets/pattern-light.svg";
</script>

<template>
  <div class="relative">
    <div class="flex justify-center">
      <Navbar />
    </div>
    <main>
      <PatternLight class="absolute top-0 right-0 translate-x-1/2" />
      <PatternLight class="absolute top-0 left-0 translate-y-1/2 -translate-x-1/2" />
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
