<script setup lang="ts">
import { ref, onMounted } from "vue";

import Divider from "@/components/ui/Divider.vue";
import GithubLogo from "@/assets/logo-github.svg";
import LinkedinLogo from "@/assets/logo-linkedin.svg";
import FemLogo from "@/assets/logo-frontend-mentor.svg";
import { sanityClient } from "@/composables/Sanity";
import type { Blog } from "@/types/blog";
import BlogLink from "@/components/BlogLink.vue";

const articles = ref<Blog[]>([]);

onMounted(async () => {
  const query = `*[_type == "blog"] | order(publishedAt desc)[0..5]`;

  const result = await sanityClient.fetch(query);
  articles.value = result;
});
</script>

<template>
  <div class="flex flex-col gap-6 pt-12">
    <h1 class="text-2 self-start with-underline">Hi, I'm Paulina 👋</h1>
    <div class="flex flex-col gap-6">
      <p class="text-7 text-(--foreground-secondary)">
        I'm on a journey to become a front-end web developer. I love building little projects,
        trying out new coding techniques, and sharing what I learn along the way. When I'm not at my
        desk, you'll find me reading, hiking through the mountains, or challenging myself on
        rock-climbing walls.
      </p>
      <p class="text-7 text-(--foreground-secondary)">
        I started this blog to document my progress, keep myself accountable, and hopefully inspire
        anyone else who's learning to code. Welcome to my corner of the internet, and thanks for
        stopping by!
      </p>
      <div class="flex gap-4 items-center">
        <a
          class="border-2 border-(--border-color) p-2 rounded-md bg-(--neutral-0) dark:bg-(--neutral-800)"
          aria-label="GitHub link"
          href="https://github.com/mickoymouse"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo
        /></a>
        <a
          class="border-2 border-(--border-color) p-2 rounded-md bg-(--neutral-0) dark:bg-(--neutral-800)"
          aria-label="LinkedIn link"
          href="https://www.linkedin.com/in/micko-silvestre-1b5b4a188"
          target="_blank"
          rel="noopener noreferrer"
          ><LinkedinLogo
        /></a>
        <a
          class="border-2 border-(--border-color) p-2 rounded-md bg-(--neutral-0) dark:bg-(--neutral-800)"
          aria-label="Frontend Mentor link"
          href="https://www.frontendmentor.io/profile/mickoymouse"
          target="_blank"
          rel="noopener noreferrer"
          ><FemLogo
        /></a>
      </div>
    </div>
    <Divider />
    <section class="flex-1 flex flex-col gap-8 pb-6" aria-label="Latest Articles">
      <header class="flex gap-4">
        <h2 class="text-2">Latest Articles</h2>
        <span class="h-1 w-10 bg-(--blue-500) inline-block self-end mb-2" aria-hidden="true"></span>
      </header>
      <div class="flex flex-col gap-6">
        <article v-for="article in articles" :key="article._id">
          <BlogLink :article="article" />
        </article>
      </div>
    </section>
  </div>
</template>
