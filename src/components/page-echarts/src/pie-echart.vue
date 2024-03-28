<template>
  <div class="pie-echart">
    <baseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import baseEcharts from './base-echarts.vue'
interface IOptionData {
  opData: any[]
}
const props = defineProps<IOptionData>()
const option: EChartsOption = {
  //值者显示的文本
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    left: 'left'
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '50%',
      data: props.opData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
</script>

<style lang="less" scoped>
.pie-echart {
  color: blue;
}
</style>
./base-echart.vue./base-echarts.vue
