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
const isLoading = ref(true);

onMounted(async () => {
  try {
    const query = `*[_type == "blog"] | order(publishedAt desc)[0..5]`;

    const result = await sanityClient.fetch(query);
    articles.value = result;
  } catch (error) {
    console.error("Error fetching articles:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col gap-6 pt-12">
    <h1 class="text-2 self-start with-underline">Hi, I'm Micko 👋</h1>
    <div class="flex flex-col gap-6">
      <p class="text-7 text-(--foreground-secondary)">
        I started my career in mobile development, and over the years I've grown into a versatile
        developer, working across front-end, APIs, and databases. Along the way, I've applied AWS
        from a developer's perspective and explored a range of modern tools and frameworks. I'm
        always curious, trying out new technologies, and building projects that put my skills to the
        test.
      </p>
      <p class="text-7 text-(--foreground-secondary)">
        I started this blog to document my journey, share side projects and tutorials, and reflect
        on what I've learned along the way. It's also a space to experiment with new ideas and
        showcase my work—a living portfolio of my growth as a developer.
      </p>
      <p class="text-7 text-(--foreground-secondary)">
        When I'm not coding or exploring tech, you'll usually find me gaming—either on the computer
        or at the chessboard, which I'm currently obsessed with and trying to get better at. Welcome
        to my corner of the internet—let's learn, experiment, and maybe even play a game or two
        along the way!
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
      <div v-if="isLoading" class="flex flex-col gap-6">
        <div v-for="i in 5" :key="i" class="flex flex-col gap-4">
          <div class="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
          <div class="h-3 w-1/2 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-6">
        <article v-for="article in articles" :key="article._id">
          <BlogLink :article="article" />
        </article>
      </div>
    </section>
  </div>
</template>
