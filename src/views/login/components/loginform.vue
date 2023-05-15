<script setup lang="ts">
import { ref } from 'vue'
import { PhoneFilled, Lock } from '@element-plus/icons-vue'
import type { FormRules, FormInstance } from 'element-plus'
import {useUserStore} from '@/store/modules/user'
import {useRouter} from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const ruleForm = ref({
  appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
  phone: '',
  password: ''
})

const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/

const rules = ref<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^((\(\d{2,3}\))|(\d{3}\-))?1[3|5|8]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: REGEXP_PWD, message: '密码格式应为8-18位数字、字母、符号的任意两种组合', trigger: 'blur' }
  ]
})

const ruleFormRef = ref<FormInstance>()

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm.value)
      userStore.setLogin(ruleForm.value).then(()=>{
        router.push({ path: '/'});
      })
      debugger
      
    } else {
      console.log('error submit!', fields)
    }
  })
}

const emit = defineEmits<{
  (e: 'changeForm', money: boolean): void
}>()
function toCreate() {
  emit('changeForm', false)
}
</script>

<template>
  <div class="login-form">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop="phone">
        <el-input :prefix-icon="PhoneFilled" placeholder="手机号" clearable v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" placeholder="密码" clearable type="password" show-password v-model="ruleForm.password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="sub-link">
      <span class="text">还没有帐号? </span>
      <span class="to-create" @click="toCreate">创建新帐号</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5%;
  overflow: hidden;
  margin-top: 70px;

  .el-form {
    .el-form-item {
      .el-input {
        height: 42px;
        margin-bottom: 5px;
      }

      .el-button {
        margin-top: 17px;
        width: 100%;
        height: 42px;
        letter-spacing: 0.3em;
        margin-right: -0.3em;
      }
    }
  }

  .sub-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 7px;
    font-size: 14px;
    color: var(--el-text-color-secondary);

    .text {
      margin-right: 15px;
    }
    .to-create {
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }
}
</style>
