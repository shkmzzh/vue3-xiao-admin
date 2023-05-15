import request from '@/utils/request'
export function getLogin(data:object){
    return request({
        method:'post',
        url:'/login',
        data
    })
}
export function getRegister(data:object){
    return request({
        method:'post',
        url:'/register',
        data
    })
}