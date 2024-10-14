<template>
  <a-layout class="layout-container">
    <a-layout-sider class="layout-sider" :width="256">
      <SiderComponent />
    </a-layout-sider>
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import SiderComponent from '@/components/layout/SiderComponent.vue'
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
}

.layout-sider {
  background: #fff;
  overflow: auto;
}

.layout-content {
  padding: 24px;
  background: #fff;
}
</style>
