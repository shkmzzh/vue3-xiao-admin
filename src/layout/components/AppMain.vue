<script setup lang="ts">
import { useTagsViewStore } from '@/store/modules/tagsView';

const tagsViewStore = useTagsViewStore();
</script>

<template>
   <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--el-bg-color-page);
}

.fixed-header + .app-main {
  padding-top: 50px;
}
.fixed-header-top + .app-main {
  padding-top: 50px;
}
.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
    min-height: 100vh;
  }
  .fixed-header-top + .app-main {
    padding-top: 84px;
    min-height: 100vh;
  }
}
</style>
