import axios, { InternalAxiosRequestConfig, AxiosResponse,AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store'
import { uploadToken } from '@/api/auth/index'

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
    console.log(config)

    if (!config.headers.noToken) {
      // 不是每个接口都需要统一添加 token 或者并不需要Token 不需要的, 在请求头 headers中添加 noToken:true
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
      // 判断 refreshToken token 的过期时间是否到了,过期了需重新登录
      const userStore = useUserStore()
      console.log(userStore.userInfo.refExpTime, Date.now())
      console.log(userStore.userInfo.refExpTime <= Date.now())
      if (userStore.userInfo.refExpTime <= Date.now()) {
        debugger
        ElMessage.error('登录过期需重新登录!')
      } else if (!isRefreshing) {
        // debugger
        // // 否则调用 token更新 接口 恢复token

        // console.log('666666')
        // console.log(userStore.userInfo.refreshToken)
        // uploadToken().then((res)=>{
        //   if (res.code === 200) {
        //     // 更新 token
        //     userStore.changeUpdateToken(res.data.accessToken, res.data.refreshToken)
        //     //需求 让 accessToken 过期期间请求失败的接口 重新发起请求
        //     retryRequest.trigger(res.data.accessToken) // 发布
        //   }

        //   console.log(res)
        //   debugger
        // }).catch((err)=>{}).finally(()=>{
        //   debugger
        //   isRefreshing = false
        // })
        //   try {
        //     debugger
        //     isRefreshing = true
        //     const res = await uploadToken()
        //     if (res.code === 200) {
        //       // 更新 token
        //       userStore.changeUpdateToken(res.data.accessToken, res.data.refreshToken)
        //       //需求 让 accessToken 过期期间请求失败的接口 重新发起请求
        //       retryRequest.trigger(res.data.accessToken) // 发布
        //     }
        //   } catch (error) {
        //   } finally {
        //     isRefreshing = false
        //   }
        // } else {
        //   debugger
        // retryRequest.listen(responseError)

        try {
          debugger
          isRefreshing =true
          const res = await uploadToken()
          if(res?.code===200){
            userStore.changeUpdateToken(res.data.accessToken, res.data.refreshToken)
            debugger
            // retryRequest.trigger(res.data.accessToken)
            for (let i = 0, len = retryReqs.length; i < len; i++) {
              debugger
              retryReqs[i](res.data.accessToken)
            }
            // 队列请求完成，清空
            retryReqs = []
            // 返回触发 401 接口正常结果
            responseError.config.headers = { ...responseError.config.headers, Authorization: res.data.accessToken }
            return await service(responseError.config)
          }
        } catch (error) {
          console.log(error);
          
        } finally {
          isRefreshing = false
        }
      } else {
        console.log('1111');
        debugger
        console.log('1111');
        return new Promise((resolve) => {
          retryReqs.push((token: string) => {
            debugger
            responseError.config.headers = { ...responseError.config.headers, Authorization: token }
            resolve(service(responseError.config))
          })
        })
       return retryRequest.listen(responseError)
      }
    } else {
      ElMessage.error(error.response.data.error || '系统出错')
      return Promise.reject(error)
    }
  }
)

// 将token刷新期间，因为 401 请求失败的接口 ,存入请求队列，刷新成功后重新请求一次（发布-订阅模式）
class RetryOldRequest {
  private requestQuery: ((newToken: string) => void)[] = []

  public listen(config: AxiosResponse<any>): Promise<any> {
    debugger
    return new Promise((resolve: (value: any) => void) => {
      this.requestQuery.push((newToken: string) => {
        config.headers={...config.headers,Authorization:newToken}
        resolve(service( config))
      })
    })
  }

  public trigger(newToken: string): void {
   
    // this.requestQuery.forEach((fn) => {
    //   fn(newToken)
    // })
    this.requestQuery = []
  }
}
const retryRequest = new RetryOldRequest()

export default service
