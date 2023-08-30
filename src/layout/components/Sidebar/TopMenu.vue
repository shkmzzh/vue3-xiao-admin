<script setup lang="ts">
import { useRoute } from 'vue-router'

import SidebarItem from './SidebarItem.vue'

import { useSettingsStore } from '@/store/modules/settings'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import variables from '@/styles/variables.module.scss'

const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const route = useRoute()
</script>

<template>
  <el-scrollbar>
    <el-menu
      :default-active="route.path"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="horizontal"
    >
      <sidebar-item v-for="route in permissionStore.routes" :item="route" :key="route.path" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>
<style lang="scss" scoped>
.el-menu {
  height: 50px !important;
  --el-menu-item-height: 50px;
}
.el-menu--horizontal{
  border: 0;
}
</style>
