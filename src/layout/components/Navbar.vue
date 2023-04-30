<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useUserStore } from '@/store/modules/user'
import { useSettingsStore } from '@/store/modules/settings'
import RightPanel from '@/components/RightPanel/index.vue'
import Setting from '@/layout/components/Settings/index.vue'
import { ref } from 'vue'

const settingsStore = useSettingsStore()
const showSettings = computed(() => settingsStore.showSettings)
const appStore = useAppStore()
const tagsViewStore = useTagsViewStore()
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const { device } = storeToRefs(appStore) // 设备类型：desktop-宽屏设备 || mobile-窄屏设备

function toggleSideBar() {
  appStore.toggleSidebar(true)
}
// 设置面板
const show = ref(false)
</script>

<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <!-- 左侧面包屑 -->
    <div class="flex">
      <hamburger :is-active="appStore.sidebar.opened" @toggleClick="toggleSideBar" />
      <breadcrumb />
    </div>

    <!-- 右侧导航设置 -->
    <div class="flex">
      <!-- 导航栏设置(窄屏隐藏)-->

      <div v-if="device !== 'mobile'" class="flex items-center">
        <!--全屏 -->
        <screenfull class="navbar-setting-item" />
        <!-- 布局大小 -->
        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select class="navbar-setting-item" />
        </el-tooltip>
        <!--语言选择-->
        <lang-select class="navbar-setting-item" />
        <!-- 设置面板 -->
      </div>
      <div class="setting" @click.stop="show = true">
        <i-ep-setting />
      </div>
    </div>
  </div>
  <RightPanel v-model:show="show">
    <Setting></Setting>
  </RightPanel>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 1px #0003;

  .navbar-setting-item,
  .setting {
    height: 50px;
    line-height: 50px;
    width: 32px;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    color: #5a5e66;

    &:hover {
      background: rgba(249, 250, 251, 1);
    }
  }

  .setting {
    width: 45px;
    line-height: 53px;
  }
}
</style>
