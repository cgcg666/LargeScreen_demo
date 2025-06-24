/*
 * @Description: file content
 * @Author: cg
 * @Date: 2025-06-24 11:07:39
 * @LastEditors: cg
 * @LastEditTime: 2025-06-24 19:43:33
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './global.less'
import 'virtual:uno.css'

import Echarts from 'vue-echarts'
import 'echarts-gl'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 使用组件
app.component('e-charts', Echarts)

app.mount('#app')

function Rem() {
  // 表示1000的设计图,设计图中1rem相当于10PX的默认值
  const whdef = 10 / 1000
  // 当前窗口的宽度
  const bodyWidth = document.body.clientWidth

  // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
  const rem = bodyWidth * whdef
  console.log(document.getElementsByTagName('html'))

  document.getElementsByTagName('html')[0].style.fontSize = rem + 'px'
}

window.addEventListener('load', Rem)
window.addEventListener('resize', Rem)

Rem()
