<template>
  <e-charts :option="option" autoresize></e-charts>
</template>

<script lang="ts" setup>
// 引入工具
import geoJson from '@/assets/china_province.json'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const cityData = [
  {
    name: '北京',
    coord: [116.407396, 39.9042],
    flight: 950,
    incidents: 8,
    incidentRate: 0.0084,
    riskIndex: 0.32,
    orange: 3,
    yellow: 1,
    red: 0,
    icaoCode: 'ZBAA',
  },
  {
    name: '上海',
    coord: [121.473701, 31.230416],
    flight: 920,
    incidents: 10,
    incidentRate: 0.0109,
    riskIndex: 0.44,
    orange: 2,
    yellow: 3,
    red: 1,
    icaoCode: 'ZSSS',
  },
  {
    name: '广州',
    coord: [113.264385, 23.129112],
    flight: 880,
    incidents: 12,
    incidentRate: 0.0136,
    riskIndex: 0.53,
    orange: 4,
    yellow: 3,
    red: 1,
    icaoCode: 'ZGGG',
  },
  {
    name: '成都',
    coord: [104.066541, 30.572269],
    flight: 850,
    incidents: 18,
    incidentRate: 0.0212,
    riskIndex: 0.71,
    orange: 6,
    yellow: 3,
    red: 3,
    icaoCode: 'ZUUU',
  },
  {
    name: '西安',
    coord: [108.940175, 34.341568],
    flight: 800,
    incidents: 9,
    incidentRate: 0.0113,
    riskIndex: 0.39,
    orange: 2,
    yellow: 2,
    red: 0,
    icaoCode: 'ZLXY',
  },
  {
    name: '昆明',
    coord: [102.712251, 25.040609],
    flight: 820,
    incidents: 10,
    incidentRate: 0.0122,
    riskIndex: 0.48,
    orange: 3,
    yellow: 2,
    red: 1,
    icaoCode: 'ZPPP',
  },
  {
    name: '郑州',
    coord: [113.625368, 34.746599],
    flight: 760,
    incidents: 13,
    incidentRate: 0.0171,
    riskIndex: 0.65,
    orange: 5,
    yellow: 3,
    red: 2,
    icaoCode: 'ZHCC',
  },
  {
    name: '哈尔滨',
    coord: [126.642464, 45.756967],
    flight: 600,
    incidents: 6,
    incidentRate: 0.01,
    riskIndex: 0.41,
    orange: 2,
    yellow: 1,
    red: 0,
    icaoCode: 'ZYHB',
  },
  {
    name: '海口',
    coord: [110.33119, 20.031971],
    flight: 580,
    incidents: 5,
    incidentRate: 0.0086,
    riskIndex: 0.36,
    orange: 1,
    yellow: 1,
    red: 0,
    icaoCode: 'ZJHK',
  },
  {
    name: '乌鲁木齐',
    coord: [87.616848, 43.825592],
    flight: 640,
    incidents: 7,
    incidentRate: 0.0109,
    riskIndex: 0.47,
    orange: 2,
    yellow: 2,
    red: 1,
    icaoCode: 'ZWWW',
  },
]

const option = ref({})

onMounted(() => {
  // 挂载echart
  // chartMap()
  // @ts-expect-error geojson数据
  echarts.registerMap('china', geoJson)
  option.value = {
    // 背景颜色
    backgroundColor: 'transparent',

    // 鼠标悬浮提示框配置
    tooltip: {
      // 自定义内容格式化函数
      formatter: (params) => {
        const data = cityData.find((c) => c.name === params.name)
        if (!data) return ''
        return `
        <div style="font-size:13px;">
          <strong>${params.name} (${data.icaoCode})</strong><br/>
          ✈️ 航班量: ${data.flight}<br/>
          ⚠️ 事件: ${data.incidents} (${(data.incidentRate * 100).toFixed(2)}%)<br/>
          🔴红: ${data.red} 🟡黄: ${data.yellow}
        </div>
      `
      },
      // 提示框背景颜色
      backgroundColor: 'rgba(0,0,0,0.8)',
      // 提示框文字样式
      textStyle: { color: '#fff' },
    },

    // 地理三维图配置
    // geo3D配置文档 https://echarts.apache.org/zh/option-gl.html#geo3D
    geo3D: {
      // 使用的地图类型（china为中国地图）
      map: 'china',
      // 是否支持缩放和平移
      roam: true,
      // 区域样式配置
      itemStyle: {
        // 区域颜色
        color: '#0a3fb2',
        // 区域边界颜色
        borderColor: '#0d6efd',
        // 边界宽度
        borderWidth: 1,
      },
      // 地图上城市标签样式
      label: {
        show: true, // 显示城市名称
        color: '#0a3fb2', // 字体颜色
        fontSize: 10, // 字体大小
      },
      // 鼠标悬浮时的高亮效果
      emphasis: {
        label: {
          show: true, // 显示文字
          color: '#fff', // 高亮字体颜色
          fontSize: 12,
        },
        itemStyle: {
          color: '#3399ff', // 高亮时区域颜色
        },
      },
      // 光照模式（lambert比realistic更高性能）
      shading: 'lambert',
      // 光照配置
      light: {
        // 主光源
        main: {
          intensity: 1, // 强度
          shadow: false, // 是否开启阴影
          alpha: 55, // 光源垂直角度
          beta: 10, // 光源水平角度
        },
        // 环境光
        ambient: {
          intensity: 0.3, // 环境光强度
        },
      },
      // 视角控制
      viewControl: {
        distance: 140, // 相机与视点的距离
        alpha: 35, // 俯视角度（垂直方向）
        beta: 15, // 水平旋转角度
      },
    },

    // 数据系列（柱状体）
    series: [
      // bar3D配置文档 https://echarts.apache.org/zh/option-gl.html#series-bar3D
      {
        name: '机场柱子', // 系列名称
        type: 'bar3D', // 使用 3D 柱状图
        coordinateSystem: 'geo3D', // 使用 geo3D 地理坐标系统
        barSize: 2, // 柱子的粗细
        minHeight: 2, // 柱子最小高度
        bevelSize: 0.4, // 柱子的倒角大小
        bevelSmoothness: 4, // 柱子边缘的平滑度
        shading: 'realistic', // 柱子自身的光照模式（更真实）
        realisticMaterial: {
          roughness: 0, // 粗糙度
          metalness: 0, // 金属度
        },
        data: cityData.map((c) => {
          // 根据事件发生率判断风险等级颜色
          let color = '#06bcdb' // 默认蓝色（安全）
          if (c.incidentRate > 0.02) {
            color = '#d9001b' // 红色（高风险）
          } else if (c.incidentRate > 0.015) {
            color = '#d2d257' // 黄色（中等风险）
          }

          return {
            name: c.name, // 城市名称
            value: [...c.coord, c.flight], // 经纬度 + 航班量（柱子高度）
            label: {
              show: true, // 柱子顶部标签
              formatter: `${c.icaoCode}\n${c.incidents}/${(c.incidentRate * 100).toFixed(2)}%`,
              fontSize: 12,
              color: '#fff',
              distance: 10, // 标签距离柱子顶部的距离
            },
            itemStyle: {
              color, // 柱子颜色（根据风险等级）
              opacity: 0.6, // 柱子不透明度
            },
          }
        }),
        // 再次定义柱子顶部标签（冗余但也能统一设置）
        label: {
          show: true,
          position: 'top', // 标签在柱子顶部
          fontSize: 12,
          color: '#fff',
        },
      },
    ],
  }
})
</script>

<style lang="less" scoped></style>
