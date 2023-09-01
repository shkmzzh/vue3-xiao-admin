<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'


import { useSettingsStore } from '@/store/modules/settings'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import variables from '@/styles/variables.module.scss'

const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

const layout = computed(() => settingsStore.layout)
const activePath = computed(() => appStore.activeTopMenu)

function goFirst(menu: any[]) {
  if (!menu.length) return
  const [first] = menu
  if (first.children) {
    goFirst(first.children)
  } else {
    router.push({
      name: first.name
    })
  }
}

function selectMenu(index: string) {
  console.log(activePath.value)
  console.log(index)
  console.log(permissionStore.routes)

  appStore.changeTopActive(index)
  permissionStore.getMixLeftMenu(index)
  const { mixLeftMenu } = permissionStore
  goFirst(mixLeftMenu)
}

const topMenu = ref<any[]>([])
onMounted(() => {
  console.log(permissionStore.routes)

  topMenu.value = permissionStore.routes.filter(item => !item.meta || !item.meta.hidden)
})
</script>

<template>

    <el-menu mode="horizontal" :default-active="activePath" :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="variables.menuActiveText" @select="selectMenu">
      
        <el-menu-item v-for="(route,index) in topMenu" :key="index" :index="route.path">
          <template #title>
            <svg-icon v-if="route.meta && route.meta.icon" :icon-class="route.meta.icon" />
            <span v-if="route.path === '/'"> 首页 </span>
            <template v-else>
              <span v-if="route.meta && route.meta.title">
                {{ route.meta.title }}
              </span>
            </template>
          </template>
        </el-menu-item>
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
.el-scrollbar{
    overflow-x: hidden !important;
}
</style>
