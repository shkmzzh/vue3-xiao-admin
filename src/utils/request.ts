import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response);
   
    if (response.data.code === 200) {
      return response.data
    }
    ElMessage.error(response.data.msg || '系统出错')
   
  },
  (error: any) => {
   
    console.log(error.response.data.error[0]);
    
    ElMessage.error(error.response.data.msg || '系统出错')
   
    return Promise.reject(error)
  }
)

// 导出 axios 实例
export default service
