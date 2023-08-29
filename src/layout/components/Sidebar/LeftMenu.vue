<<<<<<< HEAD
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

const { sidebarLogo } = storeToRefs(settingsStore)
const route = useRoute()

console.log(settingsStore.layout, '布局方式')

// function changeLayoutHandel() {
//   if (settingsStore.layout === 'left') {
//     return 'vertical'
//   } else if (settingsStore.layout === 'top') {
//     return 'horizontal'
//   }
// }

// watch(
//   () => {
//     settingsStore.layout
//   },
//   () => {
//     changeLayoutHandel()
//   }
// )
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
    </el-scrollbar>
  </div>
</template>
=======
<script lang="ts" setup>
import { useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import { useSettingsStore } from "@/store/modules/settings";
import { useAppStore } from "@/store/modules/app";
import variables from "@/styles/variables.module.scss";

import path from "path-browserify";
import { isExternal } from "@/utils/index";

const settingsStore = useSettingsStore();
const appStore = useAppStore();
const currRoute = useRoute();
const layout = computed(() => settingsStore.layout);
const props = defineProps({
  menuList: {
    required: true,
    default: () => {
      return [];
    },
    type: Array<any>,
  },
  basePath: {
    type: String,
    required: true,
  },
});

/**
 * 解析路径
 *
 * @param routePath 路由路径
 */
function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  // 完整路径 = 父级路径(/level/level_3) + 路由路径
  const fullPath = path.resolve(props.basePath, routePath); // 相对路径 → 绝对路径
  return fullPath;
}
</script>
<template>
  <el-menu
    :default-active="layout === 'top' ? '-' : currRoute.path"
    :collapse="!appStore.sidebar.opened"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText"
    :unique-opened="false"
    :collapse-transition="false"
    :mode="layout === 'top' ? 'horizontal' : 'vertical'"
  >
    <sidebar-item
      v-for="route in menuList"
      :key="route.path"
      :item="route"
      :base-path="resolvePath(route.path)"
      :is-collapse="!appStore.sidebar.opened"
    />
  </el-menu>
</template>
>>>>>>> 2592d69f45458371faf3aa544e5b02a36aa25ecd
