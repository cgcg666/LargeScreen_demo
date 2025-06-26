<template>
  <div class="w-full h-full">
    <e-charts ref="chartRef" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const chartRef = ref()
const option = ref({})

// 横坐标数据
const date = [
  '11/04-11/10',
  '11/11-11/17',
  '11/18-11/24',
  '11/25-12/01',
  '12/02-12/08',
  '12/09-12/15',
  '12/16-12/22',
  '12/23-12/29',
  '12/30-01/5',
  '01/06-01/12',
  '01/13-01/19',
  '01/20-01/26',
]

option.value = {
  grid: {
    top: 40,
    left: 80,
    right: 40,
    bottom: 40,
  },
  legend: {
    top: 10,
    right: 30,
    textStyle: {
      color: '#9babda',
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: date,
    axisLabel: {
      rotate: 15,
      color: '#9babda',
    },
    axisLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      show: true,
      color: '#9babda',
    },
    axisTick: {
      show: false,
    },
    splitNumber: 4,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#24519f',
      },
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    backgroundColor: 'rgba(0, 35, 120, 0.7)',
    borderColor: 'rgba(100, 162, 255, 0.3)',
    textStyle: {
      color: '#fff',
    },
    position: function (point, params, dom, rect, size) {
      const { contentSize, viewSize } = size
      const [x, y] = point
      return [x - contentSize[0] / 2, viewSize[1] - contentSize[1] - 40] // 距离底部 10px
    },
  },
  series: [
    {
      name: '全公司',
      data: [50.2, 51.6, 48.6, 53.7, 45.9, 51.3, 52.5, 50.2, 51.6, 48.6, 53.7, 45.9],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#72b0f9',
      },
      itemStyle: {
        color: '#72b0f9',
        opacity: 0,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(114, 176, 249, 0.5)' },
            { offset: 1, color: 'rgba(114, 176, 249, 0)' },
          ],
        },
      },
    },
    {
      name: '一分部',
      data: [65.3, 64.7, 63.3, 65.8, 59.2, 61.5, 65.7, 65.3, 64.7, 62.3, 65.8, 59.2],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#20cc98',
      },
      itemStyle: {
        color: '#20cc98',
        opacity: 0,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(32, 204, 152, 0.5)' },
            { offset: 1, color: 'rgba(32, 204, 152, 0)' },
          ],
        },
      },
    },
    {
      name: '二分部',
      data: [37.1, 38.6, 36.6, 39.7, 32.9, 38.3, 39.5, 37.1, 38.6, 36.6, 39.7, 32.9],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#20b9cf',
      },
      itemStyle: {
        color: '#20b9cf',
        opacity: 0,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(32, 185, 207, 0.5)' },
            { offset: 1, color: 'rgba(32, 185, 207, 0)' },
          ],
        },
      },
    },
  ],
}

let timer: any = null
let currentIndex = 0

onMounted(() => {
  timer = setInterval(() => {
    const dataLen = date.length

    // 取消之前的高亮
    chartRef.value?.dispatchAction({
      type: 'hideTip',
    })

    // 当前索引处触发tooltip
    chartRef.value?.dispatchAction({
      type: 'showTip',
      seriesIndex: 2,
      dataIndex: currentIndex,
    })

    currentIndex = (currentIndex + 1) % dataLen
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped></style>
