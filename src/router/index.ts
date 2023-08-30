import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const Layout = () => import('@/layout/index.vue')
// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'home', affix: true ,keepAlive: true,}
      },
      {
        path: '403',
        component: () => import('@/views/error-page/403.vue'),
        meta: { hidden: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: { hidden: true }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: '/error/404',
    name: 'error',
    meta: {
      title: '错误页面',
      icon: 'error',
      hidden: false
    },
    children: [
      {
        component: () => import('@/views/error-page/404.vue'),
        path: '404',
        name: '404',
        meta: { title: '404' }
      },
      {
        component: () => import('@/views/error-page/403.vue'),
        path: '403',
        name: '403',
        meta: { title: '403' }
      }
    ]
  }
]

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/login' })
  location.reload()
}
export default router
