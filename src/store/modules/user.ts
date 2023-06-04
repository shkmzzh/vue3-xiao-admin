import { defineStore } from 'pinia';
import {getLogin} from '@/api/login'
import { useStorage } from '@vueuse/core'
import router from "@/router";
export const useUserStore = defineStore('user', () => {
  const token = useStorage<string>('token','')
  async function setLogin(val:object){
  const res = await getLogin(val)
  
  token.value =res.data.token
  }
 function outLogin(){
    token.value = ''
    // resetRouter()
    // location.reload()
    router.replace({ path: '/login' })
  }
  return {
    token,
    setLogin,
    outLogin
  }
});