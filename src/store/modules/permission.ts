import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import { getAsyncRoutes } from '@/api/menu/index'
import { useSettingsStore } from '@/store/modules/settings'
const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layout/index.vue')

/**
 * Use meta.role to determine if the current user has permission
 *
 * @param roles 用户角色集合
 * @param route 路由
 * @returns
 */
// hasPermission() 返回一个布尔值 判断 是否有该角色 ，超级管理员有所有权限 ，其他角色需要 判断 roles 中的角色 是否该路由的 route.meta.roles 中存在 存在有权限访问该路由，不存在则无权
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    // 角色【超级管理员】拥有所有权限，忽略校验
    if (roles.includes('ROOT')) {
      return true
    }
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role)
      }
    })
  }
  return false
}

/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的异步(动态)路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的异步(动态)路由
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const asyncRoutes: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmpRoute = { ...route } // ES6扩展运算符复制新对象
    console.log(tmpRoute)
    // 判断用户(角色)是否有该路由的访问权限  hasPermission() 判断当前角色是否有该路由权限 有返回true 没有false
    if (hasPermission(roles, tmpRoute)) {
      if (tmpRoute.component?.toString() == 'Layout') {
        // 将 后台 传过来的 'layout' 字符 替换成 Layout 组件
        tmpRoute.component = Layout
      } else {
        // 如果后台 传过来的不是 'Layout' , 则 将传过来的来的 字符 作为组件名 注册到component上
        const component = modules[`../../views/${tmpRoute.component}.vue`]
        if (component) {
          tmpRoute.component = component
        } else {
          // 不存在 component 字段 ,添加该字段并指向404界面
          tmpRoute.component = modules[`../../views/error-page/404.vue`]
        }
      }

      if (tmpRoute.children) {
        // 如果存在子级路由 筛选该角色有哪些 当前路由的子级路由权限
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles)
      }

      // 将符合添条件的路由添加至路由表中
      asyncRoutes.push(tmpRoute)
    }
  })

  return asyncRoutes
}

// setup
export const usePermissionStore = defineStore('permission', () => {
  // state
  const routes = ref<RouteRecordRaw[]>([])
  const hasRouter = ref([])
  // actions // 拼接动态路由和静态路由
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes)
    console.log(routes.value)
  }
  /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      // 接口获取所有路由
      getAsyncRoutes()
        .then(({ data: asyncRoutes }) => {
          console.log(asyncRoutes)
          hasRouter.value = asyncRoutes
          // 根据角色获取有访问权限的路由
          const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
          // 得到有权限的路由 ，传入 setRoutes 函数与静态路由进行拼接操作
          setRoutes(accessedRoutes)
          resolve(accessedRoutes)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * 混合模式左侧菜单
   * @info 通过当前父级路径来筛选出父级对应子级路径
   */
  const mixLeftMenu = ref<RouteRecordRaw[]>([])

  function getMixLeftMenu(activeTop: string) {
    const activeRoute = routes.value.find((item) => item.path === activeTop)

    if (activeRoute) {
      mixLeftMenu.value = activeRoute.children || []
    } else {
      mixLeftMenu.value = []
    }
  }
  return { routes, hasRouter, mixLeftMenu, setRoutes, generateRoutes, getMixLeftMenu }
})
