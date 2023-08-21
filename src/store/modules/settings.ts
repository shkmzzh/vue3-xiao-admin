import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { useStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('setting', () => {
  // state
  const tagsView = useStorage<boolean>('tagsView', defaultSettings.tagsView)

  const showSettings = ref<boolean>(defaultSettings.showSettings)
  const fixedHeader = ref<boolean>(defaultSettings.fixedHeader)
  const sidebarLogo = ref<boolean>(defaultSettings.sidebarLogo)

  const layout = useStorage<string>('layout', defaultSettings.layout)
  const themeColor = useStorage<number>('themeColor', defaultSettings.themeColor)
  const sideStyle = useStorage<string>('sideStyle', defaultSettings.sideStyle)

  const prevLayout = ref<string>(layout.value)
  // actions
  function changeSetting(param: { key: string; value: any }) {
    const { key, value } = param
    switch (key) {
      case 'showSettings':
        showSettings.value = value
        break
      case 'fixedHeader':
        fixedHeader.value = value
        break
      case 'tagsView':
        tagsView.value = value
        break
      case 'sidevarLogo':
        sidebarLogo.value = value
        break
      case 'layout':
        layout.value = value
        break
      case 'themeColor':
        themeColor.value = value
        break
      case 'sideStyle':
        sideStyle.value = value
        break
      case 'prevLayout':
        prevLayout.value = value
        break
      default:
        break
    }
  }
  return {
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
    layout,
    themeColor,
    sideStyle,
    prevLayout,
    changeSetting
  }
})
