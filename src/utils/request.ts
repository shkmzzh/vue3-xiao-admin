import axios, { InternalAxiosRequestConfig, AxiosResponse} from 'axios'
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
   
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
     console.log(response);
      if(response.data && response.data.code == 102 || response.data.code == 201){
        ElMessage({
          message: response.data.msg,
          type: 'error',
        })
        return Promise.reject(new Error(response.data.msg))
      }
      ElMessage.success(response.data.msg)
      return response.data;
      
  },
  (error: any) => {
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
