<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useRoute } from 'vue-router'
import sunnyIcon from '@/assets/icons/sunny.svg'
import moonIcon from '@/assets/icons/moon.svg'
import { themeColorList, MenuObject } from '@/layout/components/theme'
import { lighten, darken } from '@/utils/color-convert'
/**
 * 暗黑模式
 */
const settingsStore = useSettingsStore()
const isDark = useDark()
const toggleDark = () => {
  useToggle(isDark)
  if (isDark.value) {
    document.documentElement.classList.remove('light')
  } else if (settingsStore.sideStyle == 'light') {
    document.documentElement.classList.add('light')
  }
}

const appStore = useAppStore()
const permissionStore = usePermissionStore()
function findOutermostParent(tree: any[], findName: string) {
  let parentMap: any = {}

  function buildParentMap(node: any, parent: any) {
    parentMap[node.name] = parent

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        buildParentMap(node.children[i], node)
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    buildParentMap(tree[i], null)
  }

  let currentNode = parentMap[findName]
  while (currentNode) {
    if (!parentMap[currentNode.name]) {
      return currentNode
    }
    currentNode = parentMap[currentNode.name]
  }

  return null
}
const againActiveTop = (newVal: string) => {
  const parent = findOutermostParent(permissionStore.routes, newVal)
  if (appStore.activeTopMenu !== parent.path) {
    appStore.changeTopActive(parent.path)
  }
}
const route = useRoute()

/**
 * 切换布局
 */
function changeLayout(layout: string) {
  settingsStore.changeSetting({ key: 'layout', value: layout })
  window.document.body.setAttribute('layout', settingsStore.layout)
  settingsStore.changeSetting({ key: 'prevLayout', value: layout })

  if (layout === 'mix') {
    route.name && againActiveTop(route.name as string)
  }
}
/**
 * 切换侧边栏风格
 */
function changeSidebarStyle(style: string) {
  settingsStore.changeSetting({ key: 'sideStyle', value: style })
  if (settingsStore.sideStyle == 'light' && isDark.value !== true) {
    document.documentElement.classList.add('light')
  } else {
    document.documentElement.classList.remove('light')
  }
}

// 主题颜色
const MenuObjectSaveKey: Map<string, string> = new Map<string, string>()
MenuObjectSaveKey.set('menuBg', '--menuBg') 
  .set('menuText', '--menuText')
  .set('menuActiveText', 'menuActiveText')
  .set('subMenuBg', '--subMenuBg')
  .set('subMenuActiveBg', '--subMenuActiveBg')
  .set('sidebarLogo', '--sidebarLogo')
  .set('menuActiveBefore', '--menuActiveBefore')
  .set('subMenuHoverText', '--subMenuHoverText')
  .set('subActiveText', '--subActiveText')

interface MenuObjectUse {
  key: string
  value: string
}
const activeColor = ref<number>(0)
/**
 * 切换主题颜色
 */

/** 设置 `element-plus` 主题色 */
function setPropertyPrimary(mode: string, i: number, color: string) {
  document.documentElement.style.setProperty(
    `--el-color-primary-${mode}-${i}`,
    isDark.value ? darken(color, (i / 10) * 50) : lighten(color, (i / 10) * 36)
  )
}
/** 切换亮暗模式 ,改变 `element-plus` 主题色 */
watch(
  isDark,
  (newVal, oldVal) => {
    for (let i = 1; i <= 2; i++) {
      setPropertyPrimary('dark', i, themeColorList.value[Number(settingsStore.themeColor)].themeColor)
    }
    for (let i = 1; i <= 9; i++) {
      setPropertyPrimary('light', i, themeColorList.value[Number(settingsStore.themeColor)].themeColor)
    }
  },
  {
    immediate: true
  }
)

/** 设置 系统主题色 */
function changeThemeColor(color: MenuObject, index: number) {
  MenuObjectSaveKey.forEach((key) => document.documentElement.style.removeProperty(key))
  const styleList: MenuObjectUse[] = []
  for (const [key, value] of Object.entries(color)) {
    if (MenuObjectSaveKey.has(key))
      styleList.push({
        key: MenuObjectSaveKey.get(key) as '', //menubg
        value: value // #xxx
      })
  }
  styleList.forEach((item) => document.documentElement.style.setProperty(item.key, item.value))
  document.documentElement.style.setProperty('--el-color-primary', color.themeColor)
  for (let i = 1; i <= 2; i++) {
    setPropertyPrimary('dark', i, color.themeColor)
  }
  for (let i = 1; i <= 9; i++) {
    setPropertyPrimary('light', i, color.themeColor)
  }
  settingsStore.changeSetting({ key: 'themeColor', value: index })
  activeColor.value = index
}

onMounted(() => {
  changeThemeColor(themeColorList.value[Number(settingsStore.themeColor)], Number(settingsStore.themeColor))
  window.document.body.setAttribute('layout', settingsStore.layout)
  if (!isDark.value) {
    changeSidebarStyle(settingsStore.sideStyle)
  }
})
</script>

<template>
  <div class="settings-container">
    <h3 class="text-base font-bold">项目配置</h3>
    <el-divider>主题</el-divider>

    <div class="flex justify-center" @click.stop>
      <el-switch
        v-model="isDark"
        size="large"
        @change="toggleDark"
        inline-prompt
        :active-icon="sunnyIcon"
        :inactive-icon="moonIcon"
        active-color="var(--el-fill-color-dark)"
        inactive-color="var(--el-color-primary)"
      />
    </div>

    <el-divider>界面设置</el-divider>
    <div class="py-[8px] flex justify-between" style="align-items: center">
      <span class="text-xs">开启 Tags-View</span>
      <el-switch v-model="settingsStore.tagsView" size="default" />
    </div>

    <div class="py-[8px] flex justify-between" style="align-items: center">
      <span class="text-xs">固定 Header</span>
      <el-switch v-model="settingsStore.fixedHeader" size="default" />
    </div>

    <div class="py-[8px] flex justify-between" style="align-items: center">
      <span class="text-xs">侧边栏 Logo</span>
      <el-switch v-model="settingsStore.sidebarLogo" size="default" />
    </div>

    <el-divider>主题颜色</el-divider>

    <ul class="w-full space-x-2 flex justify-center py-2">
      <li
        class="inline-block w-[30px] h-[30px] cursor-pointer"
        v-for="(color, index) in themeColorList"
        :key="index"
        :style="{ background: color.themeColor }"
        @click="changeThemeColor(color, index)"
        :class="{ 'active-color': activeColor == index }"
      ></li>
    </ul>

    <el-divider>导航栏模式</el-divider>

    <ul class="layout">
      <el-tooltip content="左侧模式" placement="bottom">
        <li :class="'layout-item layout-left ' + (settingsStore.layout == 'left' ? 'is-active' : '')" @click="changeLayout('left')">
          <div />
          <div />
        </li>
      </el-tooltip>
      <el-tooltip content="顶部模式" placement="bottom">
        <li :class="'layout-item layout-top ' + (settingsStore.layout == 'top' ? 'is-active' : '')" @click="changeLayout('top')">
          <div />
          <div />
        </li>
      </el-tooltip>
      <el-tooltip content="混合模式" placement="bottom">
        <li :class="'layout-item layout-mix ' + (settingsStore.layout == 'mix' ? 'is-active' : '')" @click="changeLayout('mix')">
          <div />
          <div />
        </li>
      </el-tooltip>
    </ul>
    <el-divider>导航栏风格</el-divider>
    <ul class="layout">
      <el-tooltip content="暗色侧边栏" placement="bottom">
        <li :class="'layout-item layout-dark ' + (settingsStore.sideStyle == 'dark' ? 'is-active' : '')" @click="changeSidebarStyle('dark')">
          <div />
          <div />
        </li>
      </el-tooltip>
      <el-tooltip content="白色侧边栏" placement="bottom">
        <li :class="'layout-item layout-light ' + (settingsStore.sideStyle == 'light' ? 'is-active' : '')" @click="changeSidebarStyle('light')">
          <div />
          <div />
        </li>
      </el-tooltip>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.settings-container {
  padding: 16px;

  .layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    height: 50px;

    &-item {
      width: 18%;
      height: 45px;
      background: #f0f2f5;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      border-radius: 4px;
    }

    &-item.is-active {
      border: 2px solid var(--el-color-primary);
    }

    &-left {
      box-shadow: 2px 2px 5px #767474;

      div {
        &:nth-child(1) {
          width: 30%;
          height: 100%;
          background: #1b2a47;
        }

        &:nth-child(2) {
          width: 70%;
          height: 30%;
          top: 0;
          right: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }

    &-top {
      box-shadow: 2px 2px 5px #767474;

      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }
      }
    }

    &-mix {
      box-shadow: 2px 2px 5px #767474;

      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }

        &:nth-child(2) {
          width: 30%;
          height: 70%;
          bottom: 0;
          left: 0;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }

    &-light {
      box-shadow: 2px 2px 5px #767474;

      div {
        &:nth-child(1) {
          width: 30%;
          height: 100%;
          background: #fff;
        }

        &:nth-child(2) {
          width: 70%;
          height: 30%;
          top: 0;
          right: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }

    &-dark {
      box-shadow: 2px 2px 5px #767474;

      div {
        &:nth-child(1) {
          width: 30%;
          height: 100%;
          background: #1b2a47;
        }

        &:nth-child(2) {
          width: 70%;
          height: 30%;
          top: 0;
          right: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }
  }

  .w-full {
    li {
      border-radius: 15px;
    }
  }
}

.el-switch__core .el-switch__inner :deep(.is-icon) {
  font-size: 14px;
}

.active-color {
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
