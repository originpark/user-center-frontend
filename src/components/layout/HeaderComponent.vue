<template>
  <a-layout-header class="header">
    <div class="logo-container">
      <a href="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <span class="site-name">OriginPark</span>
      </a>
    </div>
    <div class="right-icons">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <MeIcon v-if="userStore.isLogin" @click="goToMe" class="me-icon" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="goToMe">个人中心</a-menu-item>
            <a-menu-item @click="logout">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a href="https://github.com/originPark/" target="_blank" class="github-link">
        <GithubIcon />
      </a>
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import GithubIcon from '../icon/GithubIcon.vue'
import MeIcon from '../icon/MeIcon.vue'
import { useUserStore } from '@/store/stores/user'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
const userStore = useUserStore()
const router = useRouter()
function goToMe() {
  router.push('/me')
}
function logout() {
  const p = userStore.logout()
  p.then(() => {
    message.success('退出登录成功')
    router.push('/login')
  })
}
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-container a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.logo {
  height: 28px;
  width: auto;
  margin-right: 12px;
  object-fit: contain;
}

.site-name {
  font-size: 18px;
  font-weight: bold;
  user-select: none;
}

.github-link {
  display: flex;
  align-items: center;
  color: #333;
  transition: color 0.3s ease;
}

.github-link:hover {
  color: #1890ff;
}

.right-icons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
}

.me-icon {
  margin-right: 8px;
  cursor: pointer;
}

.ant-dropdown-link {
  display: flex;
  align-items: center;
  margin-right: 16px;
}
</style>
