<template>
  <div class="rose-echarts">
    <baseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import baseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'
interface IOptionData {
  opData: any[]
}
const props = defineProps<IOptionData>()
const option: EChartsOption = {
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: [10, 120],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: props.opData
    }
  ]
}
</script>

<style lang="less" scoped>
.rose-echarts {
  color: blue;
}
</style>
