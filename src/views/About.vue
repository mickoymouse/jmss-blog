<script setup lang="ts">
import { PortableText } from "@portabletext/vue";
import { h, onMounted, ref } from "vue";

import { sanityClient, urlFor } from "@/composables/Sanity";

const aboutMe = ref<any | null>(null);

onMounted(async () => {
  const query = `*[_type == "aboutMe"][0]`;
  const result = await sanityClient.fetch(query);
  aboutMe.value = result;

  console.log("About Me data:", aboutMe.value);
});

const components = {
  types: {
    image: ({ value }: { value: any }) => h("img", { src: urlFor(value.asset).width(600).url() }),
  },
};
</script>

<template>
  <div class="flex flex-col">
    <h1 class="with-underline text-2 pt-12 self-start">About Me</h1>
    <PortableText :value="aboutMe?.content" :components="components" />
  </div>
</template>
