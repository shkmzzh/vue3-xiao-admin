import request from '@/utils/request'

// 注册
export interface RegisterDataType {
  account: 'string'
  password: 'string'
  phoneNum: 'string'
  email: 'string'
  confirmPassword: 'string'
  avatar: 'string'
}
export const RegisterApi = (data?:object) => request({method:'post',url:'/api/register',data})

// 登录

export const LoginApi = (data:object)=>request({method:'post',url:'/api/login',data})
