<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings'
import sunnyIcon from '@/assets/icons/sunny.svg'
import moonIcon from '@/assets/icons/moon.svg'
import {themeColorList,MenuObject} from '@/layout/components/theme'
/**
 * 暗黑模式
 */
const settingsStore = useSettingsStore()
const isDark = useDark()
const toggleDark = () => useToggle(isDark)
/**
 * 切换布局
 */
function changeLayout(layout: string) {
  settingsStore.changeSetting({ key: 'layout', value: layout })
  window.document.body.setAttribute('layout', settingsStore.layout)
}

// 主题颜色
const themeColors = ref<string[]>(['#409EFF', '#304156', '#4954E6', '#13c2c2', '#6959CD', '#f5222d'])

const MenuObjectSaveKey: Map<string, string> = new Map<string, string>()
MenuObjectSaveKey.set('menuBg', '--menubg')
  .set('menuText', '--menuText')
  .set('menuActiveText', 'menuActiveText')
  .set('menuHover', '--menuHover')
  .set('subMenuBg', '--subMenuBg')
  .set('subMenuActiveBg', '--subMenuActiveBg')
  .set('sidebarLogo', '--sidebarLogo')
  .set('menuTitleHover', '--menuTitleHover')
  .set('menuActiveBefore', '--menuActiveBefore')

interface MenuObjectUse {
  key: string
  value: string
}

const activeColor = ref<number>(0)
/**
 * 切换主题颜色
 */
function changeThemeColor(color: MenuObject, index: number) {
  MenuObjectSaveKey.forEach(key => document.documentElement.style.removeProperty(key))

  for (const [key, value] of Object.entries(color)) {
    const styleList: MenuObjectUse[] = []
    if (MenuObjectSaveKey.has(key))
      styleList.push({
        key: MenuObjectSaveKey.get(key) as '', //menubg
        value: value // #xxx
      })
    styleList.forEach(item => document.documentElement.style.setProperty(item.key, item.value))
  }

  settingsStore.changeSetting({ key: 'layout', value: color })
  activeColor.value = index
}

onMounted(() => {
  window.document.body.setAttribute('layout', settingsStore.layout)
})
</script>

<template>
  <div class="settings-container">
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
        :style="{ background: color.themeColors }"
        @click="changeThemeColor(color, index)"
        :class="{ 'active-color': activeColor == index }"
      ></li>
    </ul>

    <el-divider>导航设置</el-divider>

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
  </div>
</template>

<style lang="scss" scoped>
.settings-container {
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
  }

  .w-full {
    li {
      border-radius: 15px;
    }
  }
}

::v-deep .el-switch__core .el-switch__inner .is-icon {
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
