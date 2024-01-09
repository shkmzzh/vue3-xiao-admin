import request from '@/utils/request'
import { CaptchaResult, LoginData, LoginResult } from './types'
import { getRefreshToken } from '@/utils/index'

// 登录
export const PostLoginApi = (data: LoginData) => request({ method: 'post', url: '/auth/login', data })
