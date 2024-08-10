<template>
  <button @click="handleClick" class="start-button">{{ buttonText }}</button>
</template>
<script setup lang="ts">
import {ref} from "vue";

const params = defineProps();
const buttonText = ref("시작");
const handleClick = () => {
  if (buttonText.value === '시작') {
    buttonText.value = '기능 점검';
  }
};
</script>
<style>
.start-button {
  background-color: #007bff; /* 파란색 배경 */
  color: white; /* 하얀 글씨 */
  border: none; /* 기본 테두리 제거 */
  padding: 8px 16px; /* 여백 추가 */
  border-radius: 4px; /* 둥근 모서리 */
  cursor: pointer; /* 마우스 오버 시 포인터 표시 */
  font-size: 14px; /* 글씨 크기 */
}

.start-button:hover {
  background-color: #0056b3; /* 호버 시 어두운 파란색 */
}
</style>