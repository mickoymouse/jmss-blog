<script setup lang="ts">
import type { Blog } from "@/types/blog";
defineProps<{ article: Blog; showExcerpt: boolean }>();
</script>

<template>
  <RouterLink :to="`/blog/${article.slug.current}`" class="flex flex-col gap-2">
    <h3 class="text-5">{{ article.title }}</h3>
    <p class="text-8-italic text-(--foreground-secondary)">
      {{
        new Date(article._createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}
    </p>
    <p v-if="showExcerpt && article.excerpt" class="text-7 text-(--foreground-secondary)">
      {{ article.excerpt }}
    </p>
  </RouterLink>
</template>
