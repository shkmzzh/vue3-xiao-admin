<script setup lang="ts">
import { useRoute} from 'vue-router'
import { isExternal } from "@/utils/index";
import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'
import path from "path-browserify";
import { useSettingsStore } from '@/store/modules/settings'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import variables from '@/styles/variables.module.scss'

const settingsStore = useSettingsStore()
const appStore = useAppStore()

const layout = computed(() => settingsStore.layout)
const { sidebarLogo } = storeToRefs(settingsStore)
const route = useRoute()

function toggleSideBar() {
  appStore.toggleSidebar(true)
}
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
          v-for="route in menuList"
          :item="route"
          :key="route.path"
          :base-path="resolvePath(route.path)"
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
