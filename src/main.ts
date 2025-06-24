/*
 * @Description: file content
 * @Author: cg
 * @Date: 2025-06-24 11:07:39
 * @LastEditors: cg
 * @LastEditTime: 2025-06-24 11:38:38
 */
import './global.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Echarts from 'vue-echarts'
import * as echarts from 'echarts'
import 'echarts-gl'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 使用组件
app.component('e-charts', Echarts)
// 全局挂载 echarts
app.config.globalProperties.$echarts = echarts

app.mount('#app')
