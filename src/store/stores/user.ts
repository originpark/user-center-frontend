import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfo, LoginForm, ResponseData, TableData, RegisterForm } from '@/types'
import api from '@/utils/api'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()
  const isLogin = ref(false)

  const login = async (loginForm: LoginForm) => {
    const res = await api.post<ResponseData<UserInfo>>('/user/login', loginForm)
    if (res.code == '20000') {
      userInfo.value = res.data
      isLogin.value = true
    } else {
      return Promise.reject(res.description)
    }
  }

  const logout = async () => {
    const res = await api.post<ResponseData<null>>('/user/logout')
    if (res.code == '20000') {
      userInfo.value = {} as UserInfo
      isLogin.value = false
    } else {
      return Promise.reject(res.description)
    }
  }

  const currentUserInfo = async () => {
    const res = await api.get<ResponseData<UserInfo>>('/user/current')
    if (res.code == '20000') {
      userInfo.value = res.data
      isLogin.value = true
    } else {
      return Promise.reject(res.description)
    }
  }

  const listUser = async () => {
    const res = await api.get<ResponseData<TableData[]>>('/user/list')
    if (res.code == '20000') {
      console.log(res.data)
      return res.data
    } else {
      return Promise.reject(res.description)
    }
  }

  const register = async (registerForm: RegisterForm) => {
    const res = await api.post<ResponseData<UserInfo>>('/user/register', registerForm)
    if (res.code == '20000') {
      return res.data
    } else {
      return Promise.reject(res.description)
    }
  }
  const deleteUser = async (id: string) => {
    if (!id || isNaN(Number(id))) {
      return Promise.reject('Invalid user ID')
    }

    const res = await api.post<ResponseData<null>>('/user/delete', { id: Number(id) })
    if (res.code == '20000') {
      return res.data
    } else {
      return Promise.reject(res.description)
    }
  }
  return { userInfo, isLogin, login, logout, currentUserInfo, listUser, register, deleteUser }
})
