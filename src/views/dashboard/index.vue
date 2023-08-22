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
    <div class="main">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1{
  color: var(--el-color-primary);
}
.main{
  display: flex;
  width: 100%;
  border: 1px solid pink;
  height: 50px;
  .left{
    height: 50px;
    flex: 1;
    background-color: green;
  }
  .right{
    background-color: deepskyblue;
    height: 50px;
    width: 250px;
  }         
}
</style>
