<script setup lang="ts">
import { useRoute } from 'vue-router'

import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'

import Logo from '@/layout/components/Sidebar/Logo.vue'
import { useSettingsStore } from '@/store/modules/settings'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import variables from '@/styles/variables.module.scss'

const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const appStore = useAppStore()

const route = useRoute()

console.log(settingsStore.layout, '布局方式')
</script>

<template>
    <el-menu
      :default-active="route.path"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      :collapse-transition="false"
      mode="horizontal"
    >
      <sidebar-item
        v-for="route in permissionStore.routes"
        :item="route"
        :key="route.path"
        :base-path="route.path"
        :is-collapse="!appStore.sidebar.opened"
      />
    </el-menu>

</template>
<style lang="scss" scoped>
.el-menu{
  height: 50px !important;
}
</style>
