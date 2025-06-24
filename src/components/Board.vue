<!--
 * @Description: file content
 * @Author: cg
 * @Date: 2025-06-24 16:34:52
 * @LastEditors: cg
 * @LastEditTime: 2025-06-24 18:40:12
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
  background: rgba(0, 35, 120, 0.36);
  border: 1px solid rgba(100, 162, 255, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &::before {
    position: absolute;
    content: '';
    width: 20px;
    height: 30px;
    border-left: 1px solid #0258f0;
    border-top: 1px solid #0258f0;
    left: -1px;
    top: -1px;
  }
  &::after {
    position: absolute;
    content: '';
    width: 20px;
    height: 30px;
    border-right: 1px solid #0258f0;
    border-bottom: 1px solid #0258f0;
    right: -1px;
    bottom: -1px;
  }
  .border_title {
    margin: 0.2rem 0 0 0.5rem;
    color: white;
    font-size: 0.9rem;
    position: relative;
    height: 1.8rem;
    width: 100%;
    font-weight: bold;
    &::after {
      position: absolute;
      content: '';
      width: 4rem;
      height: 1px;
      background: #0258f0;
      left: 1.7rem;
      opacity: 0.4;
      bottom: 0;
    }
  }
  .border_content {
    flex: 1;
  }
}
</style>
