<script setup lang='ts'>
import {} from "vue"
import RightPanel from '@/components/RightPanel/index.vue'
import setting from '@/layout/components/Settings/index.vue'
</script>

<template>
<div>面板</div>
<div>{{ $t('login.login') }}</div>
<RightPanel>
    <setting></setting>
</RightPanel>
</template>

<style scoped lang='scss'></style>
