<template>
  <input v-model="value" @input="onInput" />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps<{
  value: string;
}>();

const emit = defineEmits<{
  (e: 'valueChanged', value: string): void;
}>();

const value = ref(props.value);

// Props 변경 감지
watch(() => props.value, (newValue) => {
  value.value = newValue;
});

// input 값이 변경될 때
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('valueChanged', target.value);
};
</script>

<style scoped>
input {
  width: 100%;
  box-sizing: border-box;
}
</style>
