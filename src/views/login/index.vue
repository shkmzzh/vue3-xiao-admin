<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './components/loginform.vue'
import RegisterForm from './components/registerform.vue'
import RightSet from './components/rightset.vue'
const isForm = ref(true)
function changeForm(val: boolean) {
  isForm.value = val
}
</script>

<template>
  <div class="login">
    <div class="right-setting">
      <RightSet></RightSet>
    </div>
    <div class="contain-login">
      <div class="left-area"></div>
      <div class="right-area">
        <div class="logo">
          <img src="@/assets/logo.png" alt="" class="logo-img" />
          <p class="logo-font">XIAOADMIN</p>
        </div>
        <div class="form">
          <LoginForm v-if="isForm" @change-form="changeForm"></LoginForm>
          <RegisterForm v-else @change-form="changeForm"></RegisterForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  height: 100%;
  background-color: #fff;
}
.right-setting{
  position: fixed;
  top: 10px;
  right: 25px;
}
.contain-login {
  height: 100vh;
  background: url('@/assets/icons/login-bg.svg') no-repeat bottom scroll;
  display: flex;
  justify-content: space-between;
}
.left-area {
  width: 30vw;
  height: 30vw;
  background: url('@/assets/icons/girl.svg') no-repeat 15%;
}
.right-area {
  margin: 9% 15% 0 0;
  flex: 1;
  max-width: 750px;
  min-width: 750px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  .logo {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .logo-font {
      color: #999;
      font: 700 200% Consolas, Monaco, monospace;
      margin: 15px 0;
      text-transform: uppercase;
      
    }
    .logo-img {
      height: 10em;
      will-change: filter;
      // transition: filter 300ms;
      filter: drop-shadow(0 0 3em #0099ff);
    }
  }
  .form {
    border-radius: 10px;
    width: 450px;
    height: 100%;
    background-color: #f5faf7;
  }
}
@media (max-width: 1750px) {
  .right-area {
    margin: 6rem 11% 0 0;
    transition: all 300ms;
  }
}
@media (max-width: 1400px) {
  .right-area {
    margin: 6rem 10% 0 0;
    transition: all 300ms;
  }
}
@media (max-width: 1250px) {
  .left-area {
    display: none;
    transition: all 300ms;
  }
  .right-area {
    margin: 8.5rem auto;
    transition: all 300ms;
  }
}
@media (max-width: 950px) {
  .right-area {
    max-width: 350px;
    min-width: 350px;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    box-shadow: 0 0 0 #fff;
    .logo {
      width: 350px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      .logo-font {
        color: #999;
        font: 700 240% Consolas, Monaco, monospace;
        text-transform: uppercase;
        margin-top: 10px;
      }
      .logo-img {
        height: 5em;
        will-change: filter;
        // transition: filter 300ms;
        filter: drop-shadow(0 0 3em #0099ff);
      }
    }
    .form {
      border-radius: 10px;
      width: 350px;
      height: 100%;
      background-color: transparent;
    }
  }
}
</style>
