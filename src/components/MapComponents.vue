<template>
  <div class="map-container">
    <div class="display-area">
      <div class="box">
        <div class="icon">
          <img id="u1443_img" class="img" src="@/assets/airplanetakeoff.svg" />
        </div>
        <div class="right-item">
          <div>航班量</div>
          <div>
            <count-up
              :start-val="flightVolumeData[displayIndex]"
              :end-val="flightVolumeData[displayIndex + 1]"
              :duration="1"
              :decimalPlaces="0"
              :options="{ useGrouping: false }"
            ></count-up>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="icon">
          <img id="u1448_img" class="img" src="@/assets/point.svg" />
        </div>
        <div class="right-item">
          <div>重点监控事件发生次数/率</div>
          <div class="flex justify-center">
            <count-up
              :start-val="occurrenceCount[displayIndex]"
              :end-val="occurrenceCount[displayIndex + 1]"
              :duration="1"
              :decimalPlaces="0"
              :options="{ useGrouping: false }"
            ></count-up
            >/<count-up
              :start-val="occurrenceRate[displayIndex]"
              :end-val="occurrenceRate[displayIndex + 1]"
              :duration="1"
              :decimalPlaces="2"
              :options="{ useGrouping: false }"
            ></count-up
            >%
          </div>
        </div>
      </div>
      <div class="box">
        <div class="icon">
          <img id="u1452_img" class="img" src="@/assets/riskIndex.svg" />
        </div>
        <div class="right-item">
          <div>可控飞行撞地风险指数</div>
          <div
            :class="{
              'text-red-500': riskIndex[displayIndex + 1] > 10.5,
              'text-green-500': riskIndex[displayIndex + 1] <= 9.3,
              'text-yellow-500':
                riskIndex[displayIndex + 1] > 9.3 && riskIndex[displayIndex + 1] <= 10.5,
            }"
          >
            <count-up
              :start-val="riskIndex[displayIndex]"
              :end-val="riskIndex[displayIndex + 1]"
              :duration="1"
              :decimalPlaces="2"
              :options="{ useGrouping: false }"
            ></count-up>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="icon">
          <img id="u1825_img" class="img" src="@/assets/peopleNum.svg" />
        </div>
        <div class="right-item">
          <div>橙色人数</div>
          <div>
            <count-up
              :start-val="orangePeopleCount[displayIndex]"
              :end-val="orangePeopleCount[displayIndex + 1]"
              :duration="1"
              :decimalPlaces="0"
              :options="{ useGrouping: false }"
            ></count-up>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="icon">
          <img id="u1831_img" class="img" src="@/assets/peopleNum2.svg" />
        </div>
        <div class="right-item">
          <div>黄色人数</div>
          <div>
            <count-up
              :start-val="yellowPeopleCount[displayIndex]"
              :end-val="yellowPeopleCount[displayIndex + 1]"
              :duration="1"
              :decimalPlaces="0"
              :options="{ useGrouping: false }"
            ></count-up>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="icon">
          <img id="u1832_img" class="img" src="@/assets/peopleNum3.svg" />
        </div>
        <div class="right-item">
          <div>红色人数</div>
          <div>
            <count-up
              :start-val="redPeopleCount[displayIndex]"
              :end-val="redPeopleCount[displayIndex + 1]"
              :duration="1"
              :decimalPlaces="0"
              :options="{ useGrouping: false }"
            ></count-up>
          </div>
        </div>
      </div>
    </div>
    <div class="title">可控飞行撞地风险机场TOP10</div>
    <div class="map">
      <e-charts ref="chartRef" :option="option" autoresize></e-charts>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引入工具
import geoJson from '@/assets/china_province.json'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import CountUp from 'vue-countup-v3'

const chartRef = ref(null)

const option = ref({})

function chartMap() {
  echarts.registerMap('china', geoJson)
  option.value = {
    // 背景颜色
    backgroundColor: 'transparent',

    // 鼠标悬浮提示框配置
    tooltip: {
      backgroundColor: 'rgba(0, 35, 120, 0.7)',
      borderColor: 'rgba(100, 162, 255, 0.3)',
      textStyle: {
        color: '#fff',
      },
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
        color: '#3eabff',
        // 区域边界颜色
        borderColor: '#eee',
        // 边界宽度
        borderWidth: 1,
      },
      // 鼠标悬浮时的高亮效果
      emphasis: {
        label: {
          show: true, // 显示文字
          color: '#fff', // 高亮字体颜色
          fontSize: 14,
        },
        itemStyle: {
          color: '#006be4', // 高亮时区域颜色
        },
      },
      // 光照模式（lambert比realistic更高性能）
      shading: 'lambert',
      // 光照配置
      light: {
        // 主光源
        main: {
          intensity: 0.8, // 强度
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
        distance: 92, // 相机与视点的距离
        alpha: 65, // 俯视角度（垂直方向）
        beta: 0, // 水平旋转角度
        animation: true, // 是否开启动画。[ default: true ]
        animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
        animationEasingUpdate: 'cubicInOut', // 过渡动画的缓动效果。[ default: cubicInOut ]
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
          metalness: 0.5, // 金属度
        },
        data: cityData.map((c) => {
          // 根据事件发生率判断风险等级颜色
          let color = '#009966' // 默认绿色（安全）
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
              distance: 0, // 标签距离柱子顶部的距离
              textStyle: {
                color: '#fff', // 标签文字颜色
                fontSize: 12, // 标签文字大小
                fontWeight: 'bold', // 标签文字加粗
              },
            },
            itemStyle: {
              color, // 柱子颜色（根据风险等级）
              opacity: 0.7, // 柱子不透明度
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                opacity: 1,
                textStyle: {
                  color: '#fff', // 标签文字颜色
                  fontSize: 14, // 标签文字大小
                  fontWeight: 'bold', // 标签文字加粗
                },
              },
              itemStyle: {
                opacity: 1,
              },
            },
          }
        }),
      },
    ],
  }
}

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

const displayIndex = ref(0)
const flightVolumeData = ref([0, 768, 740, 710, 680, 650, 620, 590, 560, 530, 500]) // 航班量
const occurrenceCount = ref([0, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20]) // 事件发生次数
const occurrenceRate = ref([0, 4.95, 4.67, 4.39, 4.12, 3.85, 3.58, 3.31, 3.04, 2.77, 2.5]) // 事件发生率
const riskIndex = ref([0, 10.89, 10.56, 10.23, 9.9, 9.57, 9.24, 8.91, 8.58, 8.25, 8.92]) // 风险指数
const orangePeopleCount = ref([0, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3]) // 橙色人员数量
const yellowPeopleCount = ref([0, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0]) // 黄色人员数量
const redPeopleCount = ref([0, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0]) // 红色人员数量

function updateData() {
  // 取消上一个高亮
  chartRef.value?.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: displayIndex.value,
  })

  displayIndex.value = (displayIndex.value + 1) % 10 // 每隔5秒更新一次数据

  // 高亮当前柱子
  chartRef.value?.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: displayIndex.value,
  })
}

onMounted(() => {
  // 挂载echart
  chartMap()
  setInterval(() => {
    // 每隔5秒更新一次数据
    updateData()
  }, 3500)
})
</script>

<style lang="less" scoped>
.map-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .display-area {
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .box {
      background: rgba(0, 35, 120, 0.7);
      border: 1px solid rgba(100, 162, 255, 0.2);
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;
      .icon {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        .img {
          width: 100%;
        }
      }
      .right-item {
        font-size: 0.8rem;
        color: #fff;
        text-align: center;
      }
    }
  }
  .title {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 1.2rem;
    letter-spacing: 0.1em;
  }
  .map {
    flex: 1;
    // width: 100%;
    // height: calc(100% - 110px);
  }
}
</style>
