<script setup lang="ts">
import { ref, onMounted } from "vue";

import type { Blog } from "@/types/blog";
import { sanityClient } from "@/composables/Sanity";
import Divider from "@/components/ui/Divider.vue";
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
  <div class="flex flex-col pt-12 gap-6">
    <div>
      <header class="flex gap-4">
        <h1 class="text-2">My Articles</h1>
        <span class="h-1 w-10 bg-(--blue-500) inline-block self-end mb-2" aria-hidden="true"></span>
      </header>
      <p class="text-7 text-(--foreground-secondary)">
        Below are all my recent blog posts. Click on any title to read the full article.
      </p>
    </div>
    <Divider />
    <div v-if="isLoading" class="flex flex-col gap-6">
      <div v-for="i in 10" :key="i" class="flex flex-col gap-4">
        <div class="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
        <div class="h-3 w-1/2 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    </div>
    <div v-else class="flex flex-col gap-6">
      <article v-for="(article, index) in articles" :key="article._id">
        <BlogLink :article="article" />
        <Divider v-if="index < articles.length - 1" />
      </article>
    </div>
  </div>
</template>
