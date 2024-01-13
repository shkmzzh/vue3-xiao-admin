import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store'
// import { uploadToken } from '@/api/auth/index'

let isRefreshing = false // 控制是否恢复 token
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    // console.log(config)

    if (!config.headers.noToken) {
      // 不是每个接口都需要统一添加 token 或者并不需要Token 不需要的, 在请求头 headers中添加 noToken:true
      config.headers.Authorization = 'Bearer '+ userStore.TOOKEN.accessToken
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
    if (response.data.code === 200 || '00000') {
      return response.data
    }
    ElMessage.error(response.data.msg || '系统出错')
  },
  async (error: any) => {
    console.log(error.response)
    const responseError = error.response
    if (responseError.status === 401) {
      // 判断 refreshToken token 的过期时间是否到了,过期了需重新登录
      const userStore = useUserStore()
      if (userStore.TOOKEN.expires! <= Date.now()) {
        // 执行退出登录逻辑
        ElMessage.error('登录过期需重新登录!')
      } else if (!isRefreshing) {
        try {
          isRefreshing = true
          // const res = await uploadToken()
          // if (res?.code === 200) {
          //   userStore.changeUpdateToken(res.data.accessToken, res.data.refreshToken)
          //   retryRequest.trigger(res.data.accessToken, responseError.config)
          // }
        } catch (error) {
          console.log(error)
        } finally {
          isRefreshing = false
        }
      } else {
        // return retryRequest.listen(responseError)
      }
    } else {
      ElMessage.error(error.response.data.error || '系统出错')
      return Promise.reject(error)
    }
  }
)

/**
 * token 无感刷新
 * @notes 将token刷新期间，因为 401 请求失败的接口 ,存入请求队列，刷新成功后重新请求一次（发布-订阅模式）
 * @author shkmzzh
 */
class RetryOldRequest {
  private requestQuery: ((newToken: string) => void)[] = []

  public listen(config: AxiosResponse<any>): Promise<any> {
    debugger
    return new Promise((resolve: (value: any) => void) => {
      this.requestQuery.push((newToken: string) => {
        config.headers = { ...config.headers, Authorization: newToken }
        resolve(service(config))
      })
    })
  }

  public async trigger(newToken: string, config: AxiosResponse<any>): Promise<void> {
    for (let i = 0, fn; (fn = this.requestQuery[i++]); ) {
      fn(newToken)
    }

    this.requestQuery = []
    config.headers = { ...config.headers, Authorization: newToken }
    return await service(config)
  }
}
const retryRequest = new RetryOldRequest()

export default service
