<script setup lang="ts">
import { PortableText } from "@portabletext/vue";
import { onMounted, ref } from "vue";

import { sanityClient } from "@/composables/Sanity";
import { components } from "@/components/renderers/Components";
import type { Blog } from "@/types/blog";

const aboutMe = ref<Blog | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const query = `*[_type == "aboutMe"][0]`;
    const result = await sanityClient.fetch(query);
    aboutMe.value = result;
  } catch (error) {
    console.error("Error fetching About Me content:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col pb-4">
    <h1 class="with-underline text-2 pt-12 self-start mb-4">About Me</h1>
    <div v-if="isLoading" class="flex flex-col w-full">
      <div class="w-50 h-4 bg-gray-200 animate-pulse rounded-md"></div>
      <div class="flex flex-col">
        <div
          v-for="i in 3"
          :key="i"
          class="w-full h-4 bg-gray-200 animate-pulse rounded-md my-2"
        ></div>
      </div>
      <br />
      <div class="w-50 h-4 bg-gray-200 animate-pulse rounded-md"></div>
      <div class="flex flex-col">
        <div
          v-for="i in 3"
          :key="i"
          class="w-full h-4 bg-gray-200 animate-pulse rounded-md my-2"
        ></div>
      </div>
      <br />
      <div class="w-50 h-4 bg-gray-200 animate-pulse rounded-md"></div>
      <div class="flex flex-col">
        <div
          v-for="i in 3"
          :key="i"
          class="w-full h-4 bg-gray-200 animate-pulse rounded-md my-2"
        ></div>
      </div>
    </div>
    <PortableText v-else :value="aboutMe?.content" :components="components" />
  </div>
</template>
