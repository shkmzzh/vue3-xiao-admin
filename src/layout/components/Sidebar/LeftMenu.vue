<script setup lang="ts">
import { useRoute } from 'vue-router'

import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'

import { useSettingsStore } from '@/store/modules/settings'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import variables from '@/styles/variables.module.scss'

const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const appStore = useAppStore()

const layout = computed(() => settingsStore.layout)
const { sidebarLogo } = storeToRefs(settingsStore)
const route = useRoute()

function toggleSideBar() {
  appStore.toggleSidebar(true)
}
</script>

<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <logo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />
    <el-scrollbar>
      <el-menu
        :default-active="route.path"
        :collapse="!appStore.sidebar.opened"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
      >
        <sidebar-item
          v-for="route in permissionStore.routes"
          :item="route"
          :key="route.path"
          :base-path="route.path"
          :is-collapse="!appStore.sidebar.opened"
        />
      </el-menu>
      <div class="hamburger-bottom" v-if="layout === 'mix'">
        <hamburger :is-active="appStore.sidebar.opened" @toggleClick="toggleSideBar" />
      </div>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.hamburger-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: 0 0 6px -2px var(--el-color-primary);
  div {
    :deep(svg) {
      color: var(--el-color-primary) !important;
    }
  }
}
</style>
