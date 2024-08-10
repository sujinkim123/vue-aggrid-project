<template>
  <button @click="onClick" class="execute-button">실행</button>
</template>
<script setup lang="ts">

const onClick = () => {

};
</script>
<style>
.execute-button {
  background-color: #1bc295; /* 파란색 배경 */
  color: white; /* 하얀 글씨 */
  border: none; /* 기본 테두리 제거 */
  padding: 8px 16px; /* 여백 추가 */
  border-radius: 4px; /* 둥근 모서리 */
  cursor: pointer; /* 마우스 오버 시 포인터 표시 */
  font-size: 14px; /* 글씨 크기 */
}

.execute-button:hover {
  background-color: #1bc295; /* 호버 시 어두운 파란색 */
}
</style>