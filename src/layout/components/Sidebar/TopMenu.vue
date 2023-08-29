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
    <!-- <logo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" /> -->
    <el-scrollbar>
      <el-menu
        :default-active="route.path"
        :collapse="!appStore.sidebar.opened"
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
    </el-scrollbar>
  </div>
</template>
=======
<script lang="ts" setup>
import { usePermissionStore } from "@/store/modules/permission";
import variables from "@/styles/variables.module.scss";
import { useAppStore } from "@/store/modules/app";
import { translateRouteTitleI18n } from "@/utils/i18n";
import { useRouter,useRoute } from "vue-router";
const route =useRoute()
const appStore = useAppStore();
// const activePath = computed(() => appStore.activeTopMenu);
const router = useRouter();
// 递归跳转
const goFirst = (menu: any[]) => {
  if (!menu.length) return;
  const [first] = menu;
  if (first.children) {
    goFirst(first.children);
  } else {
    router.push({
      name: first.name,
    });
  }
};
const selectMenu = (index: string) => {
//   appStore.changeTopActive(index);
  permissionStore.getMixLeftMenu(index);
  const { mixLeftMenu } = permissionStore;
  goFirst(mixLeftMenu);
};
const permissionStore = usePermissionStore();
const topMenu = ref<any[]>([]);
onMounted(() => {
  topMenu.value = permissionStore.routes.filter(
    (item) => !item.meta || !item.meta.hidden
  );
});
</script>
<template>
  <el-scrollbar>
    <el-menu
      mode="horizontal"
      :default-active="route.path"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      @select="selectMenu"
    >
      <el-menu-item
        v-for="route in topMenu"
        :key="route.path"
        :index="route.path"
      >
        <template #title>
          <svg-icon
            v-if="route.meta && route.meta.icon"
            :icon-class="route.meta.icon"
          />
          <span v-if="route.path === '/'"> 首页 </span>
          <template v-else>
            <span v-if="route.meta && route.meta.title">
              {{ translateRouteTitleI18n(route.meta.title) }}
            </span>
          </template>
        </template>
      </el-menu-item>
      <!-- <sidebar-item
        v-for="route in topMenu"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="false"
      /> -->
    </el-menu>
  </el-scrollbar>
</template>
<style lang="scss" scoped>
.el-menu {
  height: 50px !important;
}
</style>
>>>>>>> 2592d69f45458371faf3aa544e5b02a36aa25ecd
