import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import pinia from '@/store'
import { usePermissionStore } from '@/store/modules/permission'
const store = usePermissionStore(pinia)
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
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'homepage', affix: true }
      },
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
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
    path: '/test',
    component: Layout,
    children: [
      {
        component: () => import('@/views/test/index.vue'),
        name: 'Test',
        path: '',
        meta: { title: 'test', icon: 'link' }
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
      icon: 'api'
    },
    children: [
      {
        component: () => import('@/views/error-page/404.vue'),
        path: '404',
        name: '404',
        meta: { title: '404' }
      },
      {
        component: () => import('@/views/error-page/401.vue'),
        path: '401',
        name: '401',
        meta: { title: '401' }
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
store.setRoutes([])
export default router
