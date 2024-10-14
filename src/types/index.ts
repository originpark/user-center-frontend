export interface UserInfo {
  id: string
  userName: string
  userAccount: string
  userAvatar: string
  gender: string
  phone: string
  email: string
  userStatus: number
  userRole: string
  createTime: string
}

export interface LoginForm {
  userAccount: string
  userPassword: string
  remember: boolean
}

export interface RegisterForm {
  userAccount: string
  userPassword: string
  checkPassword: string
}

export interface ResponseData<T> {
  code: string
  data: T
  message: string
  description: string
}

export interface TableData {
  key: string
  id: string
  userAccount: string
  userStatus: number
  userRole: string
  createTime: string
}
