<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const root = document.documentElement
const eyef = ref<SVGElement | null>(null)
let cx = 0
let cy = 0

const mousemoveHandler = (evt: MouseEvent) => {
  let x = evt.clientX / innerWidth
  let y = evt.clientY / innerHeight

  root.style.setProperty('--mouse-x', x.toString())
  root.style.setProperty('--mouse-y', y.toString())

  cx = 115 + 30 * x
  cy = 50 + 30 * y
  if (eyef.value) {
    eyef.value.setAttribute('cx', cx.toString())
    eyef.value.setAttribute('cy', cy.toString())
  }
}

const touchmoveHandler = (touchHandler: TouchEvent) => {
  let x = touchHandler.touches[0].clientX / innerWidth
  let y = touchHandler.touches[0].clientY / innerHeight

  root.style.setProperty('--mouse-x', x.toString())
  root.style.setProperty('--mouse-y', y.toString())
}

onMounted(() => {
  document.addEventListener('mousemove', mousemoveHandler)
  document.addEventListener('touchmove', touchmoveHandler)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', mousemoveHandler)
  document.removeEventListener('touchmove', touchmoveHandler)
})
</script>

<template>
  <div class="power">
    <svg xmlns="http://www.w3.org/2000/svg" id="robot-error" viewBox="0 0 260 118.9" role="img">
      <defs>
        <clipPath id="white-clip"><circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" /></clipPath>
        <text id="text-s" class="error-text" y="106">404</text>
      </defs>
      <path class="alarm" fill="#e62326" d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6" />
      <use xlink:href="#text-s" x="-0.5px" y="-1px" fill="var(--el-color-primary)"></use>
      <use xlink:href="#text-s" fill="#2b2b2b"></use>
      <g id="robot">
        <g id="eye-wrap">
          <use xlink:href="#white-eye"></use>
          <circle id="eyef" class="eye" ref="eyef" clip-path="url(#white-clip)" fill="#000" stroke="var(--el-color-primary)" stroke-width="2" stroke-miterlimit="10" cx="130" cy="65" r="11" />
          <ellipse id="white-eye" fill="#2b2b2b" cx="130" cy="40" rx="18" ry="12" />
        </g>
        <circle class="lightblue" cx="105" cy="32" r="2.5" id="tornillo" />
        <use xlink:href="#tornillo" x="50"></use>
        <use xlink:href="#tornillo" x="50" y="60"></use>
        <use xlink:href="#tornillo" y="60"></use>
      </g>
    </svg>
    <h1>Sorry, the page you visited does not exist</h1>
    <h2>Go <a target="_blank" href="/">Home!</a></h2>
  </div>
</template>

<style scoped lang="scss">
/* vietnamese */
@font-face {
  font-family: 'Bungee';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/bungee/v11/N0bU2SZBIuF2PU_0AnR1Gd8.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Bungee';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/bungee/v11/N0bU2SZBIuF2PU_0A3R1Gd8.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Bungee';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/bungee/v11/N0bU2SZBIuF2PU_0DXR1.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
.power {
  color: var(--el-color-text);
  font-family: 'Bungee', cursive;
  text-align: center;
  padding-top: 60px;
}
a {
  color: var(--el-color-primary);
  text-decoration: none;
  font-size: 32px;
}
svg {
  width: 50vw;
}
.lightblue {
  fill: #444;
}
.eye {
  cx: calc(115px + 30px * var(--mouse-x));
  cy: calc(50px + 30px * var(--mouse-y));
}
#eye-wrap {
  overflow: hidden;
}
.error-text {
  font-size: 120px;
}
.alarm {
  animation: alarmOn 0.5s infinite;
}

@keyframes alarmOn {
  to {
    fill: darkred;
  }
}
</style>
