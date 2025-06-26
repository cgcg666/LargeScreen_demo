<!--
 * @Description: file content
 * @Author: cg
 * @Date: 2025-06-24 16:34:52
 * @LastEditors: cg
 * @LastEditTime: 2025-06-25 16:42:28
-->
<template>
  <div class="border_container" :style="props.style">
    <div class="border_title" v-if="props.title">{{ props.title }}</div>
    <div class="border_content">
      <slot v-if="slots"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSlots, computed, ref, type Ref, type CSSProperties } from 'vue'
const props = defineProps<{
  title?: string
  style?: CSSProperties
}>()
const slots = computed(() => !!useSlots().default)
// Define your component logic here
</script>
<style lang="less" scoped>
/* Your CSS here */
.border_container {
  position: relative;
  background: rgba(0, 35, 120, 0.7);
  border: 1px solid rgba(100, 162, 255, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &::before {
    position: absolute;
    content: '';
    width: 20px;
    height: 30px;
    border-left: 3px solid #36a4cb;
    border-top: 3px solid #36a4cb;
    left: -1.5px;
    top: -1.5px;
  }
  &::after {
    position: absolute;
    content: '';
    width: 20px;
    height: 30px;
    border-right: 3px solid #36a4cb;
    border-bottom: 3px solid #36a4cb;
    right: -1.5px;
    bottom: -1.5px;
  }
  .border_title {
    margin: 0.5rem 0 0 0.6rem;
    color: white;
    font-size: 0.9rem;
    position: relative;
    height: 1.5rem;
    width: calc(100% - 1rem);
    // font-weight: bold;
    background: linear-gradient(to right,#36a4cb,transparent) ;
    border-radius: 20px;
    padding-left: 0.5rem;
    line-height: 1.5rem;
    // padding-right: ;
    // &::after {
    //   position: absolute;
    //   content: '';
    //   width: 4rem;
    //   height: 1px;
    //   background: #0258f0;
    //   left: 1.7rem;
    //   opacity: 0.4;
    //   bottom: 0;
    // }
  }
  .border_content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
