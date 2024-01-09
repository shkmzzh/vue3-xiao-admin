import request from '@/utils/request'
import { CaptchaResult, LoginData, LoginResult } from './types'
import { getRefreshToken } from '@/utils/index'

// 登录
export const LoginApi = (data: LoginData) => request({ method: 'post', url: '/auth/login', data ,headers:{noToken:true}})

