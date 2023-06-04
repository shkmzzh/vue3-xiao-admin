<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { FormRules, FormInstance } from 'element-plus'
import { getRegister } from '@/api/login'
const ruleForm = ref({
  username: '',
  password: '',
  checkPass: ''
})

// 密码二次校验

const REGEXP_PWD = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/

const rules = ref<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]{2,10}$/, message: '用户名应为2-10个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: REGEXP_PWD, message: '密码格式应为8-18位数字、字母、符号的任意两种组合', trigger: 'blur' }
  ],
  checkPass: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }
    }
  ]
})

// 提交表单
const ruleFormRef = ref<FormInstance>()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { checkPass, ...newObj } = ruleForm.value
      await getRegister(newObj)
      emit('changeForm', true)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const emit = defineEmits<{
  (e: 'changeForm', money: boolean): void
}>()
function toLogin() {
  emit('changeForm', true)
}

// Enter 键提交表单
function onkeypress({ code }: KeyboardEvent) {
  if (code === 'Enter') {
    submitForm(ruleFormRef.value)
  }
}

onMounted(() => {
  window.document.addEventListener('keypress', onkeypress)
})

onBeforeUnmount(() => {
  window.document.removeEventListener('keypress', onkeypress)
})
</script>

<template>
  <div class="register-form">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop="username">
        <el-input :prefix-icon="User" placeholder="用户名" clearable v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" placeholder="密码" clearable type="password" show-password v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input :prefix-icon="Lock" placeholder="确认密码" clearable type="password" show-password v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="sub-link">
      <span class="text">已经有账号? </span>
      <span class="to-login" @click="toLogin">去登录</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5%;
  overflow: hidden;
  margin-top: 40px;

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

    .to-login {
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }
}
</style>
