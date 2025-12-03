<script setup lang="ts">
import { computed } from "vue";

import TipIcon from "@/icons/icon-tip.svg";
import WarningIcon from "@/icons/icon-warning.svg";
import InfoIcon from "@/icons/icon-info.svg";

interface Props {
  title: string;
  text: string;
  type: "info" | "tip" | "warning";
}

const props = defineProps<Props>();

const iconColor = computed(() => {
  switch (props.type) {
    case "tip":
      return "text-(--green-700) dark:text-(--green-500)";
    case "warning":
      return "text-(--yellow-700) dark:text-(--yellow-500)";
    default:
      return "text-(--blue-700) dark:text-(--blue-500)";
  }
});

const icon = computed(() => {
  switch (props.type) {
    case "tip":
      return TipIcon;
    case "warning":
      return WarningIcon;
    default:
      return InfoIcon;
  }
});

const bgColor = computed(() => {
  switch (props.type) {
    case "tip":
      return "bg-(--green-200) border-(--green-500) dark:bg-(--green-900) dark:border-(--green-700)";
    case "warning":
      return "bg-(--yellow-200) border-(--yellow-500) dark:bg-(--yellow-900) dark:border-(--yellow-700)";
    default:
      return "bg-(--blue-200) border-(--blue-500) dark:bg-(--blue-900) dark:border-(--blue-700)";
  }
});
</script>
<template>
  <div :class="`flex ${bgColor} border rounded-xl p-4 gap-4`">
    <div class="flex items-start shrink-0 mt-1">
      <component :is="icon" class="h-[19px]" :class="iconColor" />
    </div>
    <div class="flex-1 flex flex-col item-center">
      <p class="text-5 text-(--foreground) dark:text-(--neutral-0)">{{ title }}</p>
      <p class="text-7 text-(--foreground-secondary) dark:text-(--neutral-400)">{{ text }}</p>
    </div>
  </div>
</template>
