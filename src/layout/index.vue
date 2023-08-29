<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { AppMain, Navbar, Settings, TagsView } from './components/index'

import LeftMenu from './components/Sidebar/LeftMenu.vue'
import TopMenu from './components/Sidebar/TopMenu.vue'
import Logo from './components/Sidebar/Logo.vue'

import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'


const { width } = useWindowSize()

/**
 * 响应式布局容器固定宽度
 *
 * 大屏（>=1200px）
 * 中屏（>=992px）
 * 小屏（>=768px）
 */
const WIDTH = 768

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const layout = computed(() => settingsStore.layout)
const fixedHeader = computed(() => settingsStore.fixedHeader)
const showTagsView = computed(() => settingsStore.tagsView)
const showSettings = computed(() => settingsStore.showSettings)

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened, // 隐藏侧边栏
  openSidebar: appStore.sidebar.opened, // 打开侧边栏
  withoutAnimation: appStore.sidebar.withoutAnimation, // 是否开启侧边栏动画
  mobile: appStore.device === 'mobile' // 响应式配置
}))

// watchEffect 该钩子函数 页面一加载就会执行 ，函数中的依赖项发生变化时会重新执行
watchEffect(() => {
  if (width.value < WIDTH) {
    // 小于 768 为 移动端 收起侧边栏
    appStore.toggleDevice('mobile')
    appStore.closeSideBar(true)
    settingsStore.changeSetting({ key: 'layout', value: 'left' })
  } else {
    console.log(settingsStore.layout, '5555151515155', settingsStore.prevLayout)

    if (settingsStore.prevLayout !== settingsStore.layout) {
      settingsStore.changeSetting({ key: 'layout', value: settingsStore.prevLayout })
    }
    // 大于为桌面端
    appStore.toggleDevice('desktop')

    if (width.value >= 992) {
      //大屏
      appStore.openSideBar(true)
    } else {
      appStore.closeSideBar(true)
    }
  }
})

function handleOutsideClick() {
  appStore.closeSideBar(false)
}

function toggleSideBar() {
  appStore.toggleSidebar(true)
}
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && classObj.openSidebar" class="drawer-bg" @click="handleOutsideClick"></div>

    <LeftMenu class="sidebar-container" v-if="settingsStore.layout !== 'top'"></LeftMenu>

    <div :class="{ hasTagsView: showTagsView, 'main-container': layout !== 'top' }">

      <div :class="{ 'fixed-header': fixedHeader }" v-if="layout === 'left'">
          <navbar>
            <template #layout>
              <hamburger :is-active="appStore.sidebar.opened" @toggleClick="toggleSideBar" />
              <breadcrumb />
            </template>
          </navbar>
          <tags-view v-if="showTagsView" />
      </div>

      <!-- 顶部模式 -->
      <div :class="{ 'fixed-header-top': fixedHeader }" v-else>
        <navbar>
          <template #logo v-if="layout === 'top'">
            <Logo class="top-logo" />
          </template>
          <template #layout>
            <TopMenu class="sidebar-top"></TopMenu>
          </template>
        </navbar>
        <tags-view v-if="showTagsView" />
      </div>

      <app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  &:after {
    content: '';
    display: table;
    clear: both;
  }

  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

// 顶部模式样式

.fixed-header-top {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}
.top-logo {
  width: 210px;
}

.sidebar-top {
  width: 100%;
  :deep(.el-menu) {
    // menu hover
    .el-sub-menu__title {
      &:hover {
        background-color: $menuHover !important;
      }
    }

    .is-active > .el-sub-menu__title {
      color: red !important;
    }

    & .nest-menu .el-sub-menu > .el-sub-menu__title,
    & .el-sub-menu .el-menu-item {
      min-width: $sideBarWidth !important;
      background-color: transparent;

      &:hover {
        background-color: $subMenuHover !important;
      }
    }
  }

  :deep(.el-menu-item.is-active)::before {
    content: '';
    display: block;
    width: 100%;
    height: 6%;
    background-color: $subMenuActiveBg !important;
    position: absolute;

    z-index: 0;
    bottom: 5%;
    left: 0;
    border-radius: 1px;
  }
}
</style>
