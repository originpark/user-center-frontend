import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

// 定义 Api 类，用于封装 HTTP 请求
class Api {
  // 声明一个私有的 AxiosInstance 实例
  private instance: AxiosInstance

  // 构造函数，接收一个 baseURL 参数
  constructor(baseURL: string) {
    // 创建一个新的 axios 实例，并配置基本设置
    this.instance = axios.create({
      baseURL, // 设置基础 URL
      timeout: 10000, // 设置请求超时时间为 10 秒
      headers: {
        'Content-Type': 'application/json' // 设置默认的内容类型为 JSON
      },
      withCredentials: true
    })

    // 初始化拦截器
    this.initializeInterceptors()
  }

  // 私有方法，用于设置请求和响应拦截器
  private initializeInterceptors() {
    // 设置请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 在发送请求之前执行的操作
        // 从本地存储中获取 token
        const token = localStorage.getItem('token')
        if (token) {
          // 如果 token 存在，将其添加到请求头中
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        // 处理请求错误
        return Promise.reject(error)
      }
    )

    // 设置响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // 处理响应数据
        return response
      },
      (error) => {
        // 处理响应错误
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // 处理未授权错误
              console.error('Unauthorized error')
              break
            case 404:
              // 处理未找到错误
              console.error('Not found error')
              break
            default:
              console.error('An error occurred')
          }
        }
        return Promise.reject(error)
      }
    )
  }

  // GET 请求方法
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config)
    return response.data
  }

  // POST 请求方法
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data, config)
    return response.data
  }

  // PUT 请求方法
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(url, data, config)
    return response.data
  }

  // DELETE 请求方法
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config)
    return response.data
  }
}

// 创建一个 API 实例，设置基础 URL
const api = new Api('http://localhost:8080/api')

// 导出 api 实例，以便在其他文件中使用
export default api
