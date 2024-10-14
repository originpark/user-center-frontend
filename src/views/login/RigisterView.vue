<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="register-title">欢迎注册</h2>
      <a-form
        ref="formRef"
        name="custom-validation"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
        @validate="handleValidate"
        @finishFailed="handleFinishFailed"
      >
        <!-- 账号输入框 -->
        <a-form-item has-feedback label="账号" name="userAccount">
          <a-input v-model:value="formState.userAccount">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <!-- 密码输入框 -->
        <a-form-item has-feedback label="密码" name="userPassword">
          <a-input-password v-model:value="formState.userPassword" autocomplete="off">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <!-- 确认密码输入框 -->
        <a-form-item has-feedback label="确认" name="checkPassword">
          <a-input-password v-model:value="formState.checkPassword" autocomplete="off">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <!-- 提交和重置按钮 -->
        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="register-form-button"
          >
            注册
          </a-button>
        </a-form-item>
        <div class="form-footer">
          <router-link to="/login">返回登录</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import type { RegisterForm } from '@/types'
import { useUserStore } from '@/store/stores/user'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
// 创建表单引用
const formRef = ref<FormInstance>()

const router = useRouter()
// 创建响应式表单状态
const formState = reactive<RegisterForm>({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})

// 账号验证函数
const validateAccount = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入账号')
  } else if (value.length < 8) {
    return Promise.reject('账号不能少于8位')
  }
  return Promise.resolve()
}

// 密码验证函数
const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入密码')
  } else if (value.length < 8) {
    return Promise.reject('密码不能少于8位')
  } else {
    if (formState.checkPassword !== '') {
      formRef.value?.validateFields('checkPassword')
    }
    return Promise.resolve()
  }
}

// 确认密码验证函数
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入密码')
  } else if (value.length < 8) {
    return Promise.reject('确认密码不能少于8位')
  } else if (value !== formState.userPassword) {
    return Promise.reject('两次输入的密码不一致')
  } else {
    return Promise.resolve()
  }
}

// 定义表单验证规则
const rules: Record<string, Rule[]> = {
  userAccount: [{ required: true, validator: validateAccount, trigger: 'change' }],
  userPassword: [{ required: true, validator: validatePass, trigger: 'change' }],
  checkPassword: [{ required: true, validator: validatePass2, trigger: 'change' }]
}

// 表单提交成功处理函数
const handleFinish = (values: RegisterForm) => {
  const userStore = useUserStore()

  userStore
    .register(values)
    .then(() => {
      message.success('注册成功')
      router.push('/login')
    })
    .catch((error) => {
      message.error(error)
    })
}

// 表单提交失败处理函数
const handleFinishFailed = (errors: any) => {
  console.log(errors)
}

// 表单验证处理函数
const handleValidate = (...args: any[]) => {
  console.log(args)
}

// 添加禁用按钮的计算属性
const disabled = computed(() => {
  return !(formState.userAccount && formState.userPassword && formState.checkPassword)
})
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.register-box {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
  margin-bottom: 24px;
  color: #1890ff;
}

.register-form-button {
  width: 100%;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
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
