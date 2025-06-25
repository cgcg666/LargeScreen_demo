<template>
  <div class="w-full h-full flex flex-col items-center justify-center position-relative">
    <e-charts ref="chartRef" :option="option" autoresize />

    <!-- 🧾 详情面板 -->
    <!-- <div
      v-if="currentIndex >= 0"
      class=" text-white text-sm p-4 rounded w-full max-w-xl position-absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800/50"
    >
      <div><strong>事件名：</strong>{{ pieData[currentIndex].name }}</div>
      <div><strong>数量：</strong>{{ pieData[currentIndex].value }} 次</div>
      <div><strong>占比：</strong>{{ getPercent(currentIndex) }}%</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const chartRef = ref()
const option = ref({})
const pieData = [
  { value: 24, name: '着陆距离小于250米' },
  { value: 22, name: '起飞阶段坡度大于6度' },
  { value: 15, name: '着陆阶段坡度大于6度' },
  { value: 12, name: '着陆距离大于900米' },
  { value: 8, name: '着陆收油门高度大于30英尺' },
  { value: 8, name: '接地姿态小于1度' },
  { value: 5, name: '着陆时偏流角度大' },
  { value: 2, name: '500-50进近下降率大' },
]

const currentIndex = ref(-1)
let timer: any = null
let resumeTimer: any = null

// function getPercent(index: number) {
//   const total = pieData.reduce((sum, item) => sum + item.value, 0)
//   return ((pieData[index].value / total) * 100).toFixed(2)
// }

function updateChart(highlightIndex: number) {
  const newData = pieData.map((item, idx) => {
    return {
      ...item,
      label: {
        show: true,
        position: idx === highlightIndex ? 'outside' : 'inside',
        formatter: function (params: any) {
          if (idx === highlightIndex) {
            const name = params.name.match(/.{1,8}/g)?.join('\n') || params.name
            return `{a|${name}}\n{b|${params.value} 次 (${params.percent}%)}`
          }
          return `{b|${params.percent}%}`
        },
        rich: {
          a: { color: '#fff', fontSize: 12, lineHeight: 16 },
          b: { color: '#fff', fontSize: 12 },
        },
        overflow: 'break',
      },
      labelLine: {
        show: idx === highlightIndex,
      },
      emphasis: {
        scale: true,
        label: {
          show: false, // 防止点击后自动outside
        },
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
        },
      },
    }
  })

  option.value = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>数量: {c} 次<br/>占比: {d}%',
    },
    series: [
      {
        type: 'pie',
        data: newData,
        roseType: 'area',
        radius: ['0%', '75%'],
        itemStyle: {
          borderColor: '#000',
          borderWidth: 1,
        },
        labelLayout: {
          hideOverlap: true,
        },
      },
    ],
  }

  const chartInstance = chartRef.value?.getEchartsInstance?.()
  if (chartInstance) {
    chartInstance.dispatchAction({ type: 'downplay', seriesIndex: 0 })
    if (highlightIndex >= 0) {
      chartInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: highlightIndex,
      })
    }
  }
}

function startAutoLoop() {
  clearInterval(timer)
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % pieData.length
    updateChart(currentIndex.value)
  }, 3000)
}

function handleClick(index: number) {
  clearInterval(timer)
  clearTimeout(resumeTimer)

  currentIndex.value = index
  updateChart(index)

  // ⏳ 5秒后恢复轮播
  resumeTimer = setTimeout(() => {
    startAutoLoop()
  }, 5000)
}

onMounted(() => {
  updateChart(-1)
  startAutoLoop()

  const chartInstance = chartRef.value?.getEchartsInstance?.()
  chartInstance?.on('click', (params: any) => {
    handleClick(params.dataIndex)
  })
})
</script>

<style scoped>
/* 自定义样式可视需求增强 */
</style>
