<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">欢迎登录</h2>
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        ref="formRef"
      >
        <a-form-item
          label="账号"
          name="userAccount"
          :rules="[
            { required: true, message: '请输入你的账号!' },
            { min: 8, message: '账号不能少于8位!' }
          ]"
        >
          <a-input v-model:value="formState.userAccount">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="密码"
          name="userPassword"
          :rules="[
            { required: true, message: '请输入你的密码' },
            { min: 8, message: '密码不能少于8位!' }
          ]"
        >
          <a-input-password v-model:value="formState.userPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            登录
          </a-button>
        </a-form-item>
        <div class="form-footer">
          <a class="login-form-forgot" href="">忘记密码?</a>
          <router-link to="/register">立即注册</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { LoginForm } from '@/types'
import { useUserStore } from '@/store/stores/user'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
const formRef = ref()
const router = useRouter()
const userStore = useUserStore()

const formState = reactive<LoginForm>({
  userAccount: '',
  userPassword: '',
  remember: true
})
const onFinish = (values: LoginForm) => {
  // 登录请求
  const p = userStore.login(values)
  p.then(() => {
    message.success('登录成功')
    router.push('/')
  })
    .catch((err) => {
      message.error(err)
    })
    .finally(() => {
      // 只清空密码
      formState.userPassword = ''
      formRef.value?.validateFields(['userPassword'])
    })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const disabled = computed(() => {
  return !(
    formState.userAccount &&
    formState.userPassword &&
    formState.userAccount.length >= 8 &&
    formState.userPassword.length >= 8
  )
})
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 24px;
  color: #1890ff;
}

.login-form-button {
  width: 100%;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

:deep(.ant-form-item-label > label) {
  color: #5a5a5a;
}

:deep(.ant-input-affix-wrapper) {
  border-radius: 4px;
}

:deep(.ant-btn) {
  border-radius: 4px;
}
</style>
