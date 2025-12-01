<script setup lang="ts">
import { PortableText } from "@portabletext/vue";
import { onMounted, ref } from "vue";

import { sanityClient } from "@/composables/Sanity";
import { components } from "@/components/renderers/Components";
import type { Blog } from "@/types/blog";

const aboutMe = ref<Blog | null>(null);

onMounted(async () => {
  const query = `*[_type == "aboutMe"][0]`;
  const result = await sanityClient.fetch(query);
  aboutMe.value = result;
});
</script>

<template>
  <div class="flex flex-col">
    <h1 class="with-underline text-2 pt-12 self-start">About Me</h1>
    <PortableText :value="aboutMe?.content" :components="components" />
  </div>
</template>
