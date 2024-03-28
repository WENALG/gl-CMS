<template>
  <div class="base-page">
    <div class="echarts" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'

interface IOption {
  option: EChartsOption
}
const pros = defineProps<IOption>()
const echartRef = ref<HTMLElement>()
onMounted(() => {
  //初始化实例
  const echartsInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  //监听option的变化，重新执行
  watchEffect(() => echartsInstance.setOption(pros.option))
  //缩放
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
})
</script>

<style lang="less" scoped>
.base-page {
  color: blue;
  .echarts {
    height: 300px;
  }
}
</style>
