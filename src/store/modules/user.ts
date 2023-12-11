import { defineStore } from 'pinia';
import {LoginApi} from '@/api/auth'
import { useStorage } from '@vueuse/core'
import router from "@/router";
export const useUserStore = defineStore('user', () => {
  const token = useStorage<string>('token','')
  async function setLogin(val:object){
  const res = await LoginApi(val)
    console.log(res);
    
  token.value ='666666666666666'
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