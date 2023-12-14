import { defineStore } from 'pinia'
import { LoginApi } from '@/api/auth'
import { useStorage } from '@vueuse/core'
import router from '@/router'
import jwtDecode from 'jwt-decode'

export interface UserInfoType {
  accessToken: string
  refreshToken: string
  refExpTime: number
}
export const useUserStore = defineStore('user', () => {
  const userInfo = useStorage<UserInfoType>('userInfo', {} as UserInfoType)

  // 获取登录 数据
  async function setLogin(val: object) {
    const { data: res } = await LoginApi(val)
    console.log(res)
    userInfo.value = res
    userInfo.value.refExpTime = (jwtDecode(userInfo.value?.refreshToken) as any)?.exp * 1000 ?? 0
  }
  // 退出登录
  function outLogin() {
    userInfo.value = {} as UserInfoType
    // resetRouter()
    // location.reload()
    router.replace({ path: '/login' })
  }

  // 更新 token
  function changeUpdateToken(accessToken:string,refreshToken:string){
    userInfo.value.accessToken =accessToken
    userInfo.value.refreshToken = refreshToken
    userInfo.value.refExpTime = (jwtDecode(refreshToken) as any)?.exp * 1000 ?? 0
  }

  return {
    userInfo,
    setLogin,
    outLogin,
    changeUpdateToken
  }
})
