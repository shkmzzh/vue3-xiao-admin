<script setup lang="ts">
import { useRoute } from 'vue-router'

import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'

import LeftMenu from './LeftMenu.vue'
import TopMenu from './TopMenu.vue'

import { useSettingsStore } from '@/store/modules/settings'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import variables from '@/styles/variables.module.scss'
const layout = computed(() => settingsStore.layout);

const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const appStore = useAppStore()

const { sidebarLogo } = storeToRefs(settingsStore)
const route = useRoute()

console.log(settingsStore.layout, '布局方式')

function changeLayoutHandel() {
  if (settingsStore.layout === 'left') {
    return 'vertical'
  } else if (settingsStore.layout === 'top') {
    return 'horizontal'
  }
}

watch(
  () => {
    settingsStore.layout
  },
  () => {
    changeLayoutHandel()
  }
)
</script>

<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <template v-if="layout ==='left'">
      <LeftMenu></LeftMenu>
    </template>
    <template v-else-if="layout ==='top'">
      <TopMenu></TopMenu>
    </template>
  </div>
</template>
