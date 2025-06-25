<!--
 * @Description: file content
 * @Author: cg
 * @Date: 2025-06-24 11:07:39
 * @LastEditors: cg
 * @LastEditTime: 2025-06-25 14:53:51
-->
<template>
  <div class="container">
    <div class="title">CTIT 专题大屏</div>
    <div class="content">
      <div style="grid-area: 1 / 1 / 11 / 5">
        <Board title="可控飞行撞地风险飞机TOP10">
          <e-charts :option="option1" autoresize></e-charts>
        </Board>
      </div>
      <div style="grid-area: 11 / 1 / 21 / 5">
        <Board title="可控飞行撞地风险人员TOP10">
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
                  :start-val="0"
                  :end-val="394.42"
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
                  :start-val="0"
                  :end-val="5.5"
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
                  :start-val="0"
                  :end-val="200"
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
                  :start-val="0"
                  :end-val="2.2"
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
                  :start-val="0"
                  :end-val="394.42"
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
                  :start-val="0"
                  :end-val="7.2"
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
          <Scrollbar style="max-height: 100%" :auto-hide="false">
            <div>啊啊啊5</div>
          </Scrollbar>
        </Board>
      </div>
      <div style="grid-area: 14 / 17 / 21 / 21">
        <Board title="监控事件占比明细"><div>啊啊啊6</div></Board>
      </div>
      <div style="grid-area: 15 / 5 / 21 / 17">
        <Board title="近12周风险监测概览"><div>啊啊啊7</div></Board>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CountUp from 'vue-countup-v3'
import Board from '@/components/Board.vue'
import MapComponents from '@/components/MapComponents.vue'
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
