<script setup lang="ts">
import Divider from "@/components/ui/Divider.vue";
import GithubLogo from "@/assets/logo-github.svg";
import LinkedinLogo from "@/assets/logo-linkedin.svg";
import FemLogo from "@/assets/logo-frontend-mentor.svg";
</script>

<template>
  <div class="flex flex-col gap-6 h-[60px]">
    <Divider />
    <footer class="flex items-center justify-between">
      <p class="text-8">Made with ❤️ and ☕️</p>
      <div class="flex gap-4 items-center">
        <a
          aria-label="GitHub link"
          href="https://github.com/mickoymouse"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo
        /></a>
        <a
          aria-label="LinkedIn link"
          href="https://www.linkedin.com/in/micko-silvestre-1b5b4a188"
          target="_blank"
          rel="noopener noreferrer"
          ><LinkedinLogo
        /></a>
        <a
          aria-label="Frontend Mentor link"
          href="https://www.frontendmentor.io/profile/mickoymouse"
          target="_blank"
          rel="noopener noreferrer"
          ><FemLogo
        /></a>
      </div>
    </footer>
  </div>
</template>
