<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { AppMain, Navbar, Settings, TagsView } from './components/index'
import Sidebar from './components/Sidebar/index.vue'

import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'

import LayoutTransverse from './LayoutTransverse/index.vue'

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

const fixedHeader = computed(() => settingsStore.fixedHeader)
const showTagsView = computed(() => settingsStore.tagsView)
const showSettings = computed(() => settingsStore.showSettings)

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened, // 隐藏侧边栏
  openSidebar: appStore.sidebar.opened, // 打开侧边栏
  withoutAnimation: appStore.sidebar.withoutAnimation, // 是否开启侧边栏动画
  mobile: appStore.device === 'mobile' // 响应式配置
}))

const prevLayout = ref('top')

// watchEffect 该钩子函数 页面一加载就会执行 ，函数中的依赖项发生变化时会重新执行
watchEffect(() => {
  if (width.value < WIDTH) {
    // 小于 992 为 移动端 收起侧边栏
    appStore.toggleDevice('mobile')
    appStore.closeSideBar(true)
    settingsStore.changeSetting({ key: 'layout', value: 'left' })
  } else {
    // 大于为桌面端
    appStore.toggleDevice('desktop')
    console.log(settingsStore.layout);
    
   
    if (width.value >= 1200) {
      // settingsStore.changeSetting({ key: 'layout', value: prevLayout.value})
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
</script>

<template>
  <div :class="classObj" class="app-wrapper" v-if="settingsStore.layout === 'left'">
    <div v-if="classObj.mobile && classObj.openSidebar" class="drawer-bg" @click="handleOutsideClick"></div>

    <Sidebar class="sidebar-container" />

    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="showTagsView" />
      </div>

      <app-main />
    </div>
  </div>
  <div class="LayoutTransverse">
    <LayoutTransverse v-if="settingsStore.layout === 'top'"></LayoutTransverse>
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
</style>
