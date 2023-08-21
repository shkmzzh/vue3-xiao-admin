<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { AppMain, Navbar, Settings, TagsView } from '@/layout/components/index';
import Sidebar from './components/Sidebar.vue';

import { useAppStore,useSettingsStore } from '@/store';

const { width } = useWindowSize();

/**
 * 响应式布局容器固定宽度
 *
 * 大屏（>=1200px）
 * 中屏（>=992px）
 * 小屏（>=768px）
 */
const WIDTH = 768;

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const fixedHeader = computed(() => settingsStore.fixedHeader);
const showTagsView = computed(() => settingsStore.tagsView);
const showSettings = computed(() => settingsStore.showSettings);

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened, // 隐藏侧边栏
  openSidebar: appStore.sidebar.opened, // 打开侧边栏
  withoutAnimation: appStore.sidebar.withoutAnimation, // 是否开启侧边栏动画
  mobile: appStore.device === 'mobile' // 响应式配置
}));

// watchEffect 该钩子函数 页面一加载就会执行 ，函数中的依赖项发生变化时会重新执行
// watchEffect(() => {
//   if (width.value < WIDTH) {
//     // 小于 992 为 移动端 收起侧边栏
//     appStore.toggleDevice('mobile');
//     appStore.closeSideBar(true);
//  } else {
//     // 大于为桌面端
//     appStore.toggleDevice('desktop');

//     if (width.value >= 768) {
//       //大屏
//       appStore.openSideBar(true);
//     } else {
//       appStore.closeSideBar(true);
//     }
//   }
// });

function handleOutsideClick() {
  appStore.closeSideBar(false);
}
</script>

<template>
  <div class="layout-transverse">
    <Navbar>
      <template #layout>
        <Sidebar></Sidebar>
      </template>
     
    </Navbar>
   
    <TagsView></TagsView>
   
    <AppMain></AppMain>
  </div>
</template>

<style scoped lang="scss">
.layout-transverse {
  width: 100%;
}
</style>
