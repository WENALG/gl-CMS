<template>
  <div class="bar-echart">
    <baseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import baseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'
interface IbarData {
  label: any[]
  value: any[]
}
const props = defineProps<IbarData>()
const option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: props.label
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.value,
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}
</script>

<style lang="less" scoped>
.bar-echart {
  height: 350px;
}
</style>
