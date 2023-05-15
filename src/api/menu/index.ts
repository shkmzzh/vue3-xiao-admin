import mockservice from '@/utils/mockservice'

export const getAsyncRoutes = () => {
  return mockservice({
    method: 'get',
    url: '/test'
  })
}
