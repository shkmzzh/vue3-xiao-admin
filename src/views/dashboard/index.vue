<script setup lang="ts">
interface objtype {
  age: number
  name: string
}
const obj = ref<objtype>({
  age: 18,
  name: 'xiao小',
})

function add() {
  obj.value.age++
}
</script>

<template>
  <div>
    <h1>welcome {{ obj.age }}</h1>
    <el-button @click="add"> 添加 </el-button>
  </div>
</template>

<style scoped lang="scss">
h1{
  color: var(--el-color-primary);
}
</style>
