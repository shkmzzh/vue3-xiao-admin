<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

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
    <el-menu
      mode="horizontal"
      :default-active="route.path"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
    >
      <sidebar-item v-for="(route,index) in permissionStore.routes" :item="route" :key="index" :base-path="route.path" :is-collapse="false" />
    </el-menu>
</template>
<style lang="scss" scoped>
.el-menu {
  height: 50px !important;
  --el-menu-item-height: 50px;
  
}
.el-menu--horizontal {
  border: 0;
}
</style>
