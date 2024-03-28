<template>
  <div class="line-echart">
    <baseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import baseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'

interface ILineData {
  label: any[]
  value: any[]
}
const props = defineProps<ILineData>()
const option: EChartsOption = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.label
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.value,
      type: 'line',
      areaStyle: {}
    }
  ]
}
</script>

<style lang="less" scoped>
.line-echart {
  height: 350px;
}
</style>
