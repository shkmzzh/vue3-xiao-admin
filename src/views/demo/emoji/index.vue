<script setup>
import { ref, onMounted } from 'vue'

const EmotionList = ref([
  '微笑',
  '撇嘴',
  '色',
  '发呆',
  '得意',
  '流泪',
  '害羞',
  '闭嘴',
  '睡',
  '大哭',
  '尴尬',
  '发怒',
  '调皮',
  '呲牙',
  '惊讶',
  '难过',
  '酷',
  '冷汗',
  '抓狂',
  '吐',
  '偷笑',
  '可爱',
  '白眼',
  '傲慢',
  '饥饿',
  '困',
  '惊恐',
  '流汗',
  '憨笑',
  '大兵',
  '奋斗',
  '咒骂',
  '疑问',
  '嘘',
  '晕',
  '折磨',
  '衰',
  '骷髅',
  '敲打',
  '再见',
  '擦汗',
  '抠鼻',
  '鼓掌',
  '糗大了',
  '坏笑',
  '左哼哼',
  '右哼哼',
  '哈欠',
  '鄙视',
  '委屈',
  '快哭了',
  '阴险',
  '亲亲',
  '吓',
  '可怜',
  '菜刀',
  '西瓜',
  '啤酒',
  '篮球',
  '乒乓',
  '咖啡',
  '饭',
  '猪头',
  '玫瑰',
  '凋谢',
  '示爱',
  '爱心',
  '心碎',
  '蛋糕',
  '闪电',
  '炸弹',
  '刀',
  '足球',
  '瓢虫',
  '便便',
  '月亮',
  '太阳',
  '礼物',
  '拥抱',
  '强',
  '弱',
  '握手',
  '胜利',
  '抱拳',
  '勾引',
  '拳头',
  '差劲',
  '爱你',
  'NO',
  'OK',
  '爱情',
  '飞吻',
  '跳跳',
  '发抖',
  '怄火',
  '转圈',
  '磕头',
  '回头',
  '跳绳',
  '挥手',
  '激动',
  '街舞',
  '献吻',
  '左太极',
  '右太极'
])

const RefConent = ref(null)

const htmlval = ref('')
const textval = ref('')

onMounted(() => {
  console.log(RefConent.value)
})

function keydownEvent(e) {
  if (e.keyCode === 13) {
    let range = window.getSelection().getRangeAt(0)
    range.endContainer.setAttribute('name', 'on-enter')
  }
}

function handleEmoji(emoji, index) {
  var selection = window.getSelection() // 获取光标
  if (
    // 如果没有焦点或者焦点不在输入框内，聚焦到输入框
    selection.anchorNode !== RefConent.value &&
    !RefConent.value.contains(selection.anchorNode)
  ) {
    // 聚焦到输入框
    selection.removeAllRanges()
    RefConent.value.focus()
    if (RefConent.value.lastChild) selection.getRangeAt(0).setStartAfter(RefConent.value.lastChild)
    selection.collapseToEnd()
  }
  // 创建节点
  let img = document.createElement('img')
  img.src = 'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + emoji + '.gif'
  img.className = 'in-img'
  img.setAttribute('name', index)

  let range = selection.getRangeAt(0)
  range.deleteContents()

  range.insertNode(img)
  range = range.cloneRange()
  range.setStartAfter(img)
  range.collapse()
  selection.removeAllRanges()
  selection.addRange(range)
  this.inputHandle()
}

// 点击输入框内的图标时，移动光标到对应位置
function clickInput(e) {
  // 如果点击的不是HTML标签，无需处理
  if (!(e.target instanceof HTMLImageElement)) {
    return
  }
  let target = e.target
  // 获取点击图片的中心位置
  let targetX = target.x + Math.floor(target.width / 2)

  let selection = window.getSelection() // 获取光标
  let range = selection.getRangeAt(0)

  range = range.cloneRange()
  range.setStartBefore(target)
  if (e.x < targetX) {
    range.setEndBefore(target)
  } else {
    range.setEndAfter(target)
  }

  range.collapse()
  selection.removeAllRanges()
  selection.addRange(range)
}

function inputHandle() {
  htmlval.value = RefConent.value.innerHTML
  // textval.value = parseToText(htmlval.value)
  console.log(htmlval.value)
  textval.value = htmlval.value.replace(/(<div name="on-enter"><br><\/div>){2,}/g, "<div name='on-enter'><br></div>");
  console.log(textval.value)
}
</script>
<template>
  <div>
    <div class="chat">
      <div
        class="conent"
        ref="RefConent"
        contenteditable="true"
        @input="inputHandle"
        @focus="onFocus"
        @keyup="keydownEvent"
        @click="clickInput"
      ></div>
      <div class="btn">
        <el-popover placement="bottom" :width="350" trigger="click">
          <template #default>
            <div class="emoticon-list">
              <div class="picItem" contenteditable="false" v-for="(index, item) in EmotionList" @click.stop="handleEmoji(item, index)" :key="index">
                <img :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + item + '.gif'" />
              </div>
            </div>
          </template>
          <template #reference>
            <el-button class="m-2">选择表情包</el-button>
          </template>
        </el-popover>
      </div>
    </div>
    <h1>结果htmlval</h1>
    <div v-html="htmlval"></div>
    <hr>
    <h1>结果textval</h1>
    <div v-html="textval"></div>
    <hr>
  </div>
</template>

<style scoped lang="scss">
.chat {
  position: relative;
  border: 1px solid var(--el-color-primary);
  margin: 50px;
  .btn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
.conent {
  width: 100%;
  min-height: 200px;
  padding: 10px;
}
.emoticon-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
