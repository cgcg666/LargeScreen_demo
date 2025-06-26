<template>
  <div class="relative w-full h-full">
    <e-charts ref="chartRef" :option="option" autoresize />
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

onMounted(() => {
  option.value = {
    tooltip: {
      trigger: 'item',
      confine: true,
      position: [10, 10], // 左上角的绝对像素位置
      backgroundColor: 'rgba(0, 35, 120, 0.7)',
      borderWidth: 2,
      textStyle: {
        color: '#fff',
      },
      formatter: (params) => {
        const color = params.color
        const name = params.name
        const value = params.value
        const percent = params.percent

        return `
      <div style="display:flex;align-items:center;margin-bottom:4px;font-size:0.6rem;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};margin-right:6px;"></span>
        <span>${name}</span>
      </div>
      <div style="font-size:0.6rem;">
        数量: ${value} 次<br/>
        占比: ${percent}%
      </div>
    `
      },
    },
    legend: {
      orient: 'horizontal', // 横向排列
      bottom: 0, // 放在底部
      padding: [10, 0, 10, 0], // 上右下左 padding，避免靠太近
      itemWidth: 12,
      itemHeight: 12,
      icon: 'circle',
      textStyle: {
        color: '#fff',
        fontSize: 12,
      },
    },

    series: [
      {
        type: 'pie',
        data: pieData,
        center: ['50%', '42%'],
        radius: ['0%', '75%'],
        roseType: 'area',
        itemStyle: {
          borderColor: '#000',
          borderWidth: 1,
        },
        label: {
          show: true,
          position: 'inside',
          formatter: '{d}%',
          color: '#fff',
          fontSize: 12,
          textBorderColor: '#000', // 加文字描边提高对比
          textBorderWidth: 2, // 描边宽度
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          scale: true, // 默认就是 true，可以省略
          scaleSize: 10, // 缩放比例，可选调整
          itemStyle: {
            shadowBlur: 30,
            shadowOffsetX: 0,
            shadowColor: 'rgba(255, 255, 255, 0.5)',
          },
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#fff',
            textBorderColor: '#000', // 加文字描边提高对比
            textBorderWidth: 2, // 描边宽度
          },
        },
      },
    ],
  }
  // 🚀 自动轮播 tooltip
  let index = 0

  setInterval(() => {
    chartRef.value?.dispatchAction({ type: 'downplay', seriesIndex: 0 }) // 取消所有高亮
    chartRef.value?.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: index,
    })
    chartRef.value?.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: index,
    })
    index = (index + 1) % pieData.length
  }, 3000)
})
</script>
<style scoped></style>
