<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { PortableText } from "@portabletext/vue";

import { sanityClient } from "@/composables/Sanity";
import { components } from "@/components/renderers/Components";
import type { Blog } from "@/types/blog";

const blog = ref<Blog | null>(null);
const route = useRoute();
const isLoading = ref(true);

watch(
  () => route.params,
  async (newParams) => {
    fetchBlog(newParams.slug as string);
  }
);

onMounted(async () => {
  fetchBlog(route.params.slug as string);
});

const fetchBlog = async (slug: string) => {
  try {
    const query = `*[_type == "blog" && slug.current == $slug][0]`;
    const params = { slug: slug };
    const result = await sanityClient.fetch(query, params);
    blog.value = result;
  } catch (error) {
    console.error("Error fetching blog article:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="pt-12 pb-4">
    <div v-if="isLoading" class="flex flex-col w-full gap-4">
      <div v-for="i in 5" class="flex flex-col gap-4">
        <div class="h-4 w-1/2 bg-gray-200 animate-pulse rounded-md"></div>
        <div v-for="i in 5" class="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    </div>
    <PortableText v-else :value="blog?.content" :components="components" />
  </div>
</template>
