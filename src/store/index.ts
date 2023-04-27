import {createPinia} from 'pinia'
const pinia =createPinia()
export default pinia
export * from './modules/user'
export * from './modules/app'
export * from './modules/settings'
export * from './modules/permission'
export * from './modules/tagsView'