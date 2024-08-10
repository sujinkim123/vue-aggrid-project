<template>
  <div>{{ value }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  value: string;
}>();
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
