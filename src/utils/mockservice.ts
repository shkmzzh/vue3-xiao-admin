import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const mockservice = axios.create({
  baseURL: '',
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 请求拦截器
mockservice.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
mockservice.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && response.data.code == 201) {
      ElMessage({
        message: response.data.message,
        type: 'error'
      })
      return Promise.reject(new Error(response.data.msg))
    }
    ElMessage.success(response.data.message)
    return response.data
  },
  (error: any) => {
    return Promise.reject(error.message)
  }
)

// 导出 axios 实例
export default mockservice
