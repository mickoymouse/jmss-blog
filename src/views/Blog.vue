<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { PortableText } from "@portabletext/vue";

import { sanityClient } from "@/composables/Sanity";
import { components } from "@/components/renderers/Components";
import type { Blog } from "@/types/blog";

const blog = ref<Blog | null>(null);
const route = useRoute();

watch(
  () => route.params,
  async (newParams) => {
    const query = `*[_type == "blog" && slug.current == $slug][0]`;
    const params = { slug: newParams.slug };
    const result = await sanityClient.fetch(query, params);
    blog.value = result;
  }
);

onMounted(async () => {
  const query = `*[_type == "blog" && slug.current == $slug][0]`;
  const params = { slug: route.params.slug };
  const result = await sanityClient.fetch(query, params);
  blog.value = result;
  console.log("Blog data:", blog.value);
});
</script>
<template>
  <div class="pt-12">
    <PortableText :value="blog?.content" :components="components" />
  </div>
</template>
