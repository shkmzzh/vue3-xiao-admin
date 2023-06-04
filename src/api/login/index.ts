import mockservice from '@/utils/mockservice'

export const getLogin = (data: object) => {
  return mockservice({
    method: 'post',
    url: '/login',
    data
  })
}
export const getRegister = (data: object) => {
  return mockservice({
    method: 'post',
    url: '/register',
    data
  })
}
