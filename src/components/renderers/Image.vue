<script setup lang="ts">
import type { PortableTextComponentProps } from "@portabletext/vue";

import { urlFor } from "@/composables/Sanity";

const props = defineProps<PortableTextComponentProps<{ asset: any; alt?: string }>>();
</script>
<template>
  <img class="rounded-lg" :src="urlFor(value.asset).width(600).url()" :alt="value.alt || 'Image'" />
</template>
