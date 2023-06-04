<script setup lang="ts">
import Setting from '@/layout/components/Settings/index.vue'
import { useSettingsStore } from '@/store/modules/settings'
import sunnyIcon from '@/assets/icons/sunny.svg'
import moonIcon from '@/assets/icons/moon.svg'
const settingsStore = useSettingsStore()
const isDark = useDark()
const toggleDark = () => {
  useToggle(isDark)
  if (isDark.value) {
    document.documentElement.classList.remove('light')
  } else if (settingsStore.sideStyle == 'light') {
    document.documentElement.classList.add('light')
  }
}
// 项目设置文件 不能删除非必要不修改
</script>

<template>
  <div class="flex items-center">
    <el-switch
        v-model="isDark"
        @change="toggleDark"
        inline-prompt
        :active-icon="sunnyIcon"
        :inactive-icon="moonIcon"
        active-color="var(--el-fill-color-dark)"
        inactive-color="var(--el-color-primary)"
      />
      <lang-select class="navbar-setting-item pl-3" />
      <Setting v-show="false"></Setting>
  </div>
</template>

<style scoped lang="scss"></style>
