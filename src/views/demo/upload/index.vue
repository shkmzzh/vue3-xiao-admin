<script setup lang="ts">
import COS from 'cos-js-sdk-v5'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps<{
  value: string
}>()

const fileUrl = ref()
const percentage = ref(0)
const showProgress = ref(false)
const Cos = new COS({
  SecretId: 'AKIDpPjkTu67teGcr33sQhmdCUUBagUzC8n9',
  SecretKey: '97qITNzJL4VfX8RTDepjMhkVyC8qSt52'
})

function httpRequest(res: any) {
  console.log(res)
  showProgress.value = true
  console.log(showProgress.value)
  // debugger

  Cos.uploadFile(
    {
      Bucket: 'zh-1306512768',
      Region: 'ap-beijing',
      Key: res.file.name,
      Body: res.file,
      SliceSize: 1024 * 1024 * 999999999999999,
      onProgress: (progressData) => {
        percentage.value = +(progressData.percent * 100).toFixed(2)
        if (progressData.percent === 1) {
          showProgress.value = false
        }
        console.log(JSON.stringify(progressData.percent))
        console.log(percentage.value)
      }
    },
    (err, data) => {
      if (err) {
        console.log('上传失败', err)
      } else {
        console.log('上传成功', data)
        fileUrl.value = 'http://' + data.Location
      }
    }
  )
}
</script>

<template>
  <div class="upload">
    <h3>基于腾讯云对象存储 COS 自定义文件上传</h3>
    {{ fileUrl }}
    <div class="upload-container">
      <div class="uplaod-list"></div>
      <div class="upload-content">
        <el-upload action="#" :http-request="httpRequest" :show-file-list="false">
          <el-icon><Plus /></el-icon>
        </el-upload>
        
      </div>
      <div class="progress">
          <el-progress type="circle" :percentage="percentage" />
        </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-container {
  display: flex;
  align-items: center;
  .uplaod-list {
    width: 150px;
    height: 150px;
    border: 1px solid var(--el-color-primary);
    border-radius: 6px;
    margin-right: 10px;
  }
  .upload-content {
    position: relative;
    width: 150px;
    height: 150px;
    border: 1px dashed #636466;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    .progress {
      // width: 100%;
      // height: 100%;
      // position: absolute;
      // left: 0;
      // top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
