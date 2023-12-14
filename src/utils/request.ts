import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '@/store'
import {uploadToken} from '@/api/auth/index'


let isRefreshing = false // 控制是否恢复 token
let retryReqs: any[] = []

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const userStore = useUserStore()
    console.log(config);
    
    if (!config.headers.noToken) {
      // 不是每个接口都需要统一添加 token 或者并不需要Token 不需要的 请求头 headers中添加 noToken:true
      config.headers.Authorization = userStore.userInfo.accessToken
    }

    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response)

    if (response.data.code === 200) {
      return response.data
    }
    ElMessage.error(response.data.msg || '系统出错')
  },
  async (error: any) => {
    
    
    console.log(error.response)
    const responseError = error.response
    if (responseError.status === 401) {
      debugger
      // 判断 refreshToken token 的过期时间是否到了
      const userStore = useUserStore()
      console.log(userStore.userInfo.refExpTime ,Date.now());
      console.log(userStore.userInfo.refExpTime <= Date.now());
      
      
      debugger
      if (userStore.userInfo.refExpTime <= Date.now()) {
        debugger
        ElMessage.error('登录过期需重新登录!')
      } else if (!isRefreshing) {
        isRefreshing = true
        debugger
        console.log(userStore.userInfo.refreshToken);
        
        const res =  await uploadToken()
       
       
        console.log(res);
        debugger
      }
    } else {
      ElMessage.error(error.response.data.error || '系统出错')
    }

    return Promise.reject(error)
  }
)

export default service
