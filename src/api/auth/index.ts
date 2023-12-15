import request from '@/utils/request'
import {getRefreshToken} from '@/utils/index'

// 注册
export interface RegisterDataType {
  account: 'string'
  password: 'string'
  phoneNum: 'string'
  email: 'string'
  confirmPassword: 'string'
  avatar: 'string'
}
export const RegisterApi = (data?: object) => request({ method: 'post', url: '/api/register', data })

// 登录

export const LoginApi = (data: object) => request({ method: 'post', url: '/api/login', data })

// 刷新token

export const uploadToken = () => request({ method: 'post', url: '/api/update/token',headers:{Authorization:`Bearer ${getRefreshToken()}`,noToken: true}})

// 获取用户信息

export const userInfoApi = (id?: number) => request({ url: '/api/user/one/info',params:{id}})

// 获取路由

export const peemAllApi = () => request({ url: '/api/perm/all'})