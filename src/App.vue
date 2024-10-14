<template>
  <a-layout>
    <HeaderComponent />
    <a-layout class="layout">
      <router-view />
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import HeaderComponent from './components/layout/HeaderComponent.vue'
</script>

<style scoped>
/* 如果有任何特定于App.vue的样式，保留在这里 */
.layout {
  background-color: #fff;
  margin-top: 1px;
}
</style>
