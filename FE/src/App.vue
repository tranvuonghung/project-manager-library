<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const layout = computed(() => {
  if (route.meta?.layout === "admin") {
    return "Layout-Admin";
  }
  if (route.meta?.layout === "blank") {
    return "Layout-Blank";
  }
  return "Layout-NguoiDung";
});
</script>
