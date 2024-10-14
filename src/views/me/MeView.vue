<template>
  <div>{{ userStore.userInfo }}</div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/stores/user'
const userStore = useUserStore()
</script>
