<script setup lang="ts">
import DarkIcon from "@/icons/icon-moon.svg";
import LightIcon from "@/icons/icon-sun.svg";
</script>

<template>
  <header
    class="h-[52px] flex items-center justify-between px-2 rounded-md max-w-[640px] min-w-[640px] border"
  >
    <img src="@/assets/me.jpg" alt="judge micko's image" class="h-10 w-10 rounded-md" />
    <nav class="flex gap-4">
      <ul class="flex gap-6">
        <RouterLink to="/" tag="li">Home</RouterLink>
        <RouterLink to="/" tag="li">Blog</RouterLink>
        <RouterLink to="/" tag="li">About</RouterLink>
        <RouterLink to="/" tag="li">Newsletter</RouterLink>
      </ul>
      <button>
        <DarkIcon />
      </button>
    </nav>
  </header>
</template>
