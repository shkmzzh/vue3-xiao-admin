// 根据角色动态生成路由
import { MockMethod } from 'vite-plugin-mock'

const permissionRouter = {
  path: '/demo',
  component: 'Layout',
  meta: {
    title: '组件封装',
    icon: 'menu',
    hidden: false,
    roles: [],
    keepAlive: true
  },
  children: [
    {
      component: "demo/kun",
      meta: { title: '厉不厉害你坤哥', icon: '', hidden: false, roles: [], keepAlive: true },
      name:"kun",
      path:'kun'
    }
  ]
}
export default [
  {
    url: '/getAsyncRoutes',
    method: 'get',
    response: () => {
      return {
        success: true,
        data: [permissionRouter]
      }
    }
  }
] as MockMethod[]

