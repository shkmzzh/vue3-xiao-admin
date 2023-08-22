<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { AppMain, Navbar, TagsView } from '@/layout/components/index'
import Sidebar from './components/Sidebar.vue'

import { useAppStore, useSettingsStore } from '@/store'
import Logo from '@/layout/components/Sidebar/Logo.vue'
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

// watchEffect 该钩子函数 页面一加载就会执行 ，函数中的依赖项发生变化时会重新执行
watchEffect(() => {
  if (width.value < WIDTH) {
    // 小于 992 为 移动端 收起侧边栏
    appStore.toggleDevice('mobile')
    // appStore.closeSideBar(true)
  } else {
    // 大于为桌面端
    appStore.toggleDevice('desktop')

    if (width.value >= 768) {
      //大屏
      // appStore.openSideBar(true)
    } else {
      // appStore.closeSideBar(true)
    }
  }
})
</script>

<template>
  <div class="layout-transverse app-wrapper" >
    <div :class="{ 'fixed-header': fixedHeader }" class="main-container">
      <Navbar>
        <template #logo>
          <Logo class="transverse-logo"/>
        </template>
        <template #layout>
          <Sidebar class="sidebar-transverse"/>
        </template>
      </Navbar>
    </div>
    <TagsView v-if="showTagsView"></TagsView>
    <AppMain></AppMain>
  </div>
</template>

<style scoped lang="scss">

.layout-transverse {
  width: 100%;
}

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
.transverse-logo {
  min-width: 180px;
  max-width: 180px;
}

.sidebar-transverse {
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
    bottom: 5% ;
    left: 0;
    border-radius: 1px;
  }
}
</style>
