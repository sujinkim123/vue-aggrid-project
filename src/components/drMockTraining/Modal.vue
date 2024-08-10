<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">×</button>
      <h3>API Details</h3>
      <p><strong>TC_ID:</strong> {{ tcID }}</p>
      <p><strong>Section:</strong> {{ section }}</p>
      <p><strong>API Name:</strong> {{ apiName }}</p>
      <!-- 추가적인 API 정보는 여기에 표시 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  tcID: String,
  section: String,
  apiName: String
});

const emit = defineEmits(['update:isVisible']);

const close = () => {
  emit('update:isVisible', false);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 500px;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
