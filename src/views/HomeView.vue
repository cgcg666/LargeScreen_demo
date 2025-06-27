<!--
 * @Description: file content
 * @Author: cg
 * @Date: 2025-06-24 11:07:39
 * @LastEditors: cg
 * @LastEditTime: 2025-06-25 18:51:28
-->
<template>
  <div class="container">
    <div class="title">CFIT 可控飞行撞地</div>
    <div class="content">
      <div style="grid-area: 1 / 1 / 11 / 5">
        <Board title="风险飞机TOP10">
          <e-charts :option="option1" autoresize></e-charts>
        </Board>
      </div>
      <div style="grid-area: 11 / 1 / 21 / 5">
        <Board title="风险人员TOP10">
          <e-charts :option="option2" autoresize></e-charts>
        </Board>
      </div>
      <div style="grid-area: 1 / 5 / 15 / 17">
        <MapComponents />
      </div>
      <div style="grid-area: 1 / 17 / 6 / 21">
        <Board title="关键指标均值">
          <div class="indexList">
            <div class="Parallel" />
            <div class="vertical1" />
            <div class="vertical2" />
            <div>
              <div class="indexTitle">着陆距离</div>
              <div class="indexNum">
                <count-up
                  :start-val="indexList.prevList[0]"
                  :end-val="indexList.curList[0]"
                  :duration="1"
                  :decimalPlaces="2"
                  :options="{ useGrouping: false }"
                ></count-up>
                m
              </div>
            </div>
            <div>
              <div class="indexTitle">平飘事件</div>
              <div class="indexNum">
                <count-up
                  :start-val="indexList.prevList[1]"
                  :end-val="indexList.curList[1]"
                  :duration="1"
                  :decimalPlaces="2"
                  :options="{ useGrouping: false }"
                ></count-up
                >s
              </div>
            </div>
            <div>
              <div class="indexTitle">复飞后收轮高度</div>
              <div class="indexNum">
                <count-up
                  :start-val="indexList.prevList[2]"
                  :end-val="indexList.curList[2]"
                  :duration="1"
                  :decimalPlaces="2"
                  :options="{ useGrouping: false }"
                ></count-up
                >ft
              </div>
            </div>
            <div>
              <div class="indexTitle">起飞俯仰变化率</div>
              <div class="indexNum">
                <count-up
                  :start-val="indexList.prevList[3]"
                  :end-val="indexList.curList[3]"
                  :duration="1"
                  :decimalPlaces="2"
                  :options="{ useGrouping: false }"
                ></count-up
                >%
              </div>
            </div>
            <div>
              <div class="indexTitle">50英尺进近速度</div>
              <div class="indexNum">
                <count-up
                  :start-val="indexList.prevList[4]"
                  :end-val="indexList.curList[4]"
                  :duration="1"
                  :decimalPlaces="2"
                  :options="{ useGrouping: false }"
                ></count-up
                >m
              </div>
            </div>
            <div>
              <div class="indexTitle">接地姿态大</div>
              <div class="indexNum">
                <count-up
                  :start-val="indexList.prevList[5]"
                  :end-val="indexList.curList[5]"
                  :duration="1"
                  :decimalPlaces="2"
                  :options="{ useGrouping: false }"
                ></count-up
                >°
              </div>
            </div>
          </div>
        </Board>
      </div>
      <div style="grid-area: 6 / 17 / 14 / 21">
        <Board title="重点监控事件">
          <Scrollbar
            ref="scrollRef"
            style="max-height: 100%; padding: 5px 0 10px"
            :auto-hide="false"
            @mouseenter="isHovering = true"
            @mouseleave="isHovering = false"
          >
            <div style="height: 22rem">
              <e-charts :option="option3" autoresize></e-charts>
            </div>
          </Scrollbar>
        </Board>
      </div>
      <div style="grid-area: 14 / 17 / 21 / 21">
        <Board title="监控事件占比明细"><AreaComponents /></Board>
      </div>
      <div style="grid-area: 15 / 5 / 21 / 17">
        <Board title="近12周风险监测概览"><LineComponents /></Board>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CountUp from 'vue-countup-v3'
import Board from '@/components/Board.vue'
import MapComponents from '@/components/MapComponents.vue'
import AreaComponents from '@/components/AreaComponents.vue'
import LineComponents from '@/components/LineComponents.vue'
// import * as echarts from 'echarts'
import * as echarts from 'echarts'

const list1 = [11, 12, 15, 18, 19, 19, 19, 21, 24, 31]
const total1 = list1.reduce((acc, val) => acc + val, 0)

const option1: echarts.EChartsOption = {
  // title: {
  //   text: 'Bar Chart with Negative Value',
  // },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 35, 120, 0.7)',
    borderColor: 'rgba(100, 162, 255, 0.3)',
    textStyle: {
      color: '#fff',
    },
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: 60,
    top: 10,
    bottom: 15,
  },
  xAxis: {
    type: 'value',
    // position: 'top',
    splitLine: {
      lineStyle: {
        color: '#3959a7',
        // type: 'dashed',
      },
    },
    axisLabel: {
      show: false,
    },
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      color: '#fff',
      opacity: 0.6,
    },
    axisTick: {
      show: false,
    },
    data: [
      'B1234',
      'B3465',
      'B3094',
      'B3244',
      'B5663',
      'B7832',
      'B5632',
      'B12367',
      'B2356',
      'B7632',
    ],
  },
  series: [
    {
      name: 'Cost',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'inside',
        offset: [0, 1.2],
        formatter: (params) => {
          const percent = ((Number(params.value) / total1) * 100).toFixed(1)
          return `${params.value}/${percent}%`
        },
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#01bee8' },
          { offset: 0.5, color: '#1e98db' },
          { offset: 1, color: '#3a74cf' },
        ]),
        borderRadius: 12, // 设置柱体圆角半径
      },
      barWidth: '50%',
      data: list1,
    },
  ],
}

const list2 = [11, 12, 15, 18, 19, 19, 19, 21, 24, 31]
const total2 = list1.reduce((acc, val) => acc + val, 0)

const option2: echarts.EChartsOption = {
  // title: {
  //   text: 'Bar Chart with Negative Value',
  // },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 35, 120, 0.7)',
    borderColor: 'rgba(100, 162, 255, 0.3)',
    textStyle: {
      color: '#fff',
    },
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: 100,
    top: 10,
    bottom: 15,
  },
  xAxis: {
    type: 'value',
    // position: 'top',
    splitLine: {
      lineStyle: {
        color: '#3959a7',
        // type: 'dashed',
      },
    },
    axisLabel: {
      show: false,
    },
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      color: '#fff',
      opacity: 0.6,
    },
    axisTick: {
      show: false,
    },
    data: [
      '张三(234274)',
      '王小强(384752)',
      '赵明(231345)',
      '李雷(427465)',
      '小李(345524)',
      '刘强(227213)',
      '郭四(148522)',
      '王五(948572)',
      '赵六(475623)',
      '小明(182345)',
    ],
  },
  series: [
    {
      name: 'Cost',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'inside',
        offset: [0, 1.2],
        formatter: (params) => {
          const percent = ((Number(params.value) / total2) * 100).toFixed(1)
          return `${params.value}/${percent}%`
        },
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#01bee8' },
          { offset: 0.5, color: '#1e98db' },
          { offset: 1, color: '#3a74cf' },
        ]),
        borderRadius: 12, // 设置柱体圆角半径
      },
      barWidth: '50%',
      data: list2,
    },
  ],
}

const list3 = [11, 12, 15, 18, 19, 19, 19, 21, 24, 31]
const total3 = list1.reduce((acc, val) => acc + val, 0)
const nameList3 = [
  '着陆距离小于250米',
  '起飞阶段坡度大于6度',
  '着陆阶段坡度大于6度',
  '着陆距离大于900米',
  '着陆收油门高度大于30英尺',
  '接地姿态小于1度',
  '着陆时偏流角度大',
  '500-50进近下降率大',
  '着陆载荷超过1.5',
  '带油门接地',
]

// 名字长度格式化
const formatName = (name) => {
  const maxLen = 6 // 每行最多字符数
  if (name.length <= maxLen) return name
  const regex = new RegExp(`.{1,${maxLen}}`, 'g')
  return name.match(regex).join('\n')
}

const option3: echarts.EChartsOption = {
  // title: {
  //   text: 'Bar Chart with Negative Value',
  // },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 35, 120, 0.7)',
    borderColor: 'rgba(100, 162, 255, 0.3)',
    textStyle: {
      color: '#fff',
    },
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: 100,
    top: 10,
    bottom: 15,
  },
  xAxis: {
    type: 'value',
    // position: 'top',
    splitLine: {
      lineStyle: {
        color: '#3959a7',
        // type: 'dashed',
      },
    },
    axisLabel: {
      show: false,
    },
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      color: '#fff',
      opacity: 0.6,
    },
    axisTick: {
      show: false,
    },
    data: nameList3.map((item) => formatName(item)),
  },
  series: [
    {
      name: 'Cost',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'inside',
        offset: [0, 1.2],
        formatter: (params) => {
          const percent = ((Number(params.value) / total3) * 100).toFixed(1)
          return `${params.value}/${percent}%`
        },
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#01bee8' },
          { offset: 0.5, color: '#1e98db' },
          { offset: 1, color: '#3a74cf' },
        ]),
        borderRadius: 12, // 设置柱体圆角半径
      },
      barWidth: '50%',
      data: list3,
    },
  ],
}

// 引用 Scrollbar 实例
const scrollRef = ref<InstanceType<typeof Scrollbar>>()
const isHovering = ref(false)
let scrollTimer: ReturnType<typeof setInterval> | null = null

// 启动自动滚动
function startAutoScroll() {
  if (scrollTimer) return
  scrollTimer = setInterval(() => {
    const el = scrollRef.value?.$refs.containerRef as HTMLElement
    if (!el || isHovering.value) return

    const maxScrollTop = el.scrollHeight - el.clientHeight
    if (el.scrollTop >= maxScrollTop) {
      el.scrollTop = 0
    } else {
      el.scrollTop += 1
    }
  }, 50)
}

// 停止自动滚动
function stopAutoScroll() {
  if (scrollTimer) {
    clearInterval(scrollTimer)
    scrollTimer = null
  }
}

const demoList = [
  [394.42, 5.5, 200.0, 2.2, 394.42, 7.2],
  [354.98, 5.78, 190.0, 2.42, 414.14, 6.48],
  [414.14, 5.23, 210.0, 1.98, 374.7, 7.56],
  [386.53, 5.61, 204.0, 2.09, 402.31, 7.06],
  [398.36, 5.12, 206.5, 2.05, 390.1, 7.6],
  [390.5, 5.83, 194.8, 2.35, 398.7, 6.9],
]

const curIndex = ref(0)

const indexList = ref({
  prevList: [0, 0, 0, 0, 0, 0, 0],
  curList: demoList[0],
})

onMounted(() => {
  const length = demoList.length
  setInterval(() => {
    if (curIndex.value + 1 === length) {
      indexList.value = {
        prevList: demoList[curIndex.value],
        curList: demoList[0],
      }
      curIndex.value = 0
    } else {
      indexList.value = {
        prevList: demoList[curIndex.value],
        curList: demoList[curIndex.value + 1],
      }
      curIndex.value += 1
    }
  }, 3500)
  startAutoScroll()
})
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #010e50 url(../assets/map_bg.jpg) center top no-repeat;
  background-size: 100% auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  user-select: none;
  @keyframes pulseGlow {
    0%,
    100% {
      text-shadow:
        0 0 5px #25f3e6,
        0 0 10px #25f3e6,
        0 0 20px #25f3e6,
        0 0 30px #f8cfbb,
        0 0 60px #f8cfbb,
        0 0 70px #f8cfbb,
        0 0 90px #ffff00,
        0 0 140px #ffff00;
    }
    50% {
      text-shadow:
        0 0 20px #f8cfbb,
        0 0 30px #f8cfbb,
        0 0 50px #f8cfbb,
        0 0 60px #25f3e6,
        0 0 90px #25f3e6,
        0 0 120px #25f3e6,
        0 0 140px #ffff00,
        0 0 180px #ffff00;
    }
  }
  .title {
    text-align: center;
    font-size: 2.2rem;
    margin: 0.5rem 0;
    font-weight: bold;
    color: white;
    text-align: center;
    letter-spacing: 0.1em;
    animation: pulseGlow 5s infinite alternate;
  }
  /* 定义动画 */

  .content {
    gap: 0.5rem;
    flex: 1;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(20, 1fr);
    overflow: hidden;
    .indexList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      .Parallel {
        position: absolute;
        width: 96%;
        height: 1px;
        background: rgba(255, 255, 255, 0.2);
        left: 2%;
        transform: translateX(-50%);
        top: 50%;
        transform: translateY(-50%);
      }
      .vertical1 {
        position: absolute;
        width: 1px;
        height: 90%;
        background: rgba(255, 255, 255, 0.2);
        left: 33.3%;
        top: 5%;
      }
      .vertical2 {
        position: absolute;
        width: 1px;
        height: 90%;
        background: rgba(255, 255, 255, 0.2);
        left: 66.6%;
        top: 5%;
      }
      & > div {
        width: 33.3%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        // align-content: space-between;
        // justify-content: space-between;
        div {
          text-align: center;
          color: #fff;
        }
        .indexTitle {
          font-size: 0.65rem;
          opacity: 0.6;
        }
        .indexNum {
          font-size: 1.2rem;
          font-weight: bold;
          :deep(.countup-wrap) {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
