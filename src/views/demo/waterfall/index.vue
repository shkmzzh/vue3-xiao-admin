<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import a from '@/assets/logo.png'

function httpRequest(res){
    console.log(res)
}
</script>

<template>
  <div>
    <img :src="a" alt="">
    <el-upload action="#" list-type="picture-card" :http-request="httpRequest">
      <el-icon><Plus /></el-icon>

    </el-upload>
  </div>
</template>

<style scoped lang="scss"></style>
