<script setup lang="ts">
import { uploadToken, userInfoApi } from '@/api/auth/index'

async function changeUploadToken() {
  await uploadToken()
}
changeUploadToken()

async function getUserInfo() {
  await userInfoApi()
}
getUserInfo()
</script>

<template>
  <div>
    <h1>welcome</h1>
    <el-button @click="changeUploadToken">更新 TOKEN</el-button>
    <el-button @click="getUserInfo">获取用户信息</el-button>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: var(--el-color-primary);
}
</style>
