<script lang="ts" setup>
import { useSettingsStore } from '@/store/modules/settings';

const settingsStore = useSettingsStore();

defineProps({
  collapse: {
    type: Boolean,
  }
});

const logo = ref(new URL(`../../../assets/logo.png`, import.meta.url).href);
</script>

<template>
  <div class="w-full h-[50px] logo">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="h-full w-full flex items-center justify-center" to="/">
        <img v-if="settingsStore.sidebarLogo" :src="logo" />
        <span v-else class="sidebar-title">XiaoAdmin</span>
      </router-link>

      <router-link v-else key="expand" class="h-full w-full flex items-center justify-center" to="/">
        <img :src="logo" />
        <span class="sidebar-title">XiaoAdmin</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}

.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.logo {
  background-color: $sidebarLogo !important;
}

img {
  height: 30px;
  display: inline-block;
}

.sidebar-title {
  height: 32px;
  line-height: 32px;
  margin: 2px 10px 0 20px;
  color: $subMenuActiveText;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 600;
}
</style>
