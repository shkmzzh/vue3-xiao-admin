<script setup>
import {ref} from 'vue'
const dialogVisible = ref(false)
</script>

<template>
  <div>
    <el-button text @click="dialogVisible = true"> Click to open Dialog </el-button>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
      <span>It's a draggable Dialog</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
