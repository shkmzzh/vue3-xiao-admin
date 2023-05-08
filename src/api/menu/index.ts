import request from '@/utils/request'

export const getAsyncRoutes = () => {
  return request({
    method: 'get',
    url: '/getAsyncRoutes'
  })
}
