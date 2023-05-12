<script setup lang="ts">
import {} from 'vue'
import { UserFilled, Lock, PhoneFilled } from '@element-plus/icons-vue'
import type { FormRules, FormInstance } from 'element-plus'

const ruleForm = ref({
  nickName: '',
  phone: '',
  password: ''
})

// 密码二次校验
const checkPass = ref('')

const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/

const rules = ref<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^((\(\d{2,3}\))|(\d{3}\-))?1[3|5|8]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
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
  await formEl.validate((valid, fields) => {
    console.log(ruleFormRef.value)
    if (valid) {
      console.log(ruleForm.value)
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
</script>

<template>
  <div class="register-form">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop="name">
        <el-input :prefix-icon="UserFilled" placeholder="用户名" clearable v-model="ruleForm.nickName"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input :prefix-icon="PhoneFilled" placeholder="手机号" clearable v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" placeholder="密码" clearable type="password" show-password v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input :prefix-icon="Lock" placeholder="确认密码" clearable type="password" show-password v-model="checkPass"></el-input>
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
  margin-top: 20px;

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
      color: #0099ff;
      cursor: pointer;
    }
  }
}
</style>
