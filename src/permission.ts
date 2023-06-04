import router from '@/router'
import pinia from '@/store'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) // 进度条

const permissionStore = usePermissionStore(pinia)

const  userStore = useUserStore()
// 白名单路由
const whiteList = ['/login']
const roles = ['ROOT']
router.beforeEach(async (to, from, next) => {

  NProgress.start()
  if (userStore.token) {
    if (to.path === '/login') {
      // 如果已登录，跳转首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = permissionStore.hasRouter.length > 0
      if (hasRoles) {
        // 未匹配到任何路由，跳转404
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }) : next('/404')
        } else {
          next()
        }
      } else {
        try {
          // const { roles } = await userStore.getInfo()
          const accessRoutes = await permissionStore.generateRoutes(['ROOT'])
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (error) {
          // 移除 token 并跳转登录页
          // await userStore.resetToken()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
