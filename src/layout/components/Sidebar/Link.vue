<script lang="ts" setup>
import { computed } from 'vue';
import { isExternal } from '@/utils/index';
import { useRouter } from 'vue-router';

import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore();

const sidebar = computed(() => appStore.sidebar); // 侧边栏的开关
const device = computed(() => appStore.device); // 桌面端移动端切换

const props = defineProps({
  to: {
    type: String,
    required: true
  }
});

const router = useRouter();
function push() {
  // 移动端并且侧边栏是开启的 将侧边栏关闭
  if (device.value === 'mobile' && sidebar.value.opened == true) {
    appStore.closeSideBar(false);
  }
  router.push(props.to).catch(err => {
    console.error(err);
  });
}
</script>

<template>
  <!-- 如果输入的是 www.baidu.com 这种链接就跳转 -->
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <!-- 否则跳路由的 path 路径 -->
  <div v-else @click="push">
    <slot />
  </div>
</template>
