<template>
  <div class="dashboard">
    <div class="top">
      <el-row :gutter="20">
        <template v-for="item in amountList" :key="item.amount">
          <el-col :span="6"><countCard v-bind="item" /></el-col>
        </template>
      </el-row>
    </div>
    <!-- 中间图 -->
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <echartCard>
            <pieEchart :op-data="categoryCountData" />
          </echartCard>
        </el-col>
        <el-col :span="8">
          <echartCard><pieEchart :op-data="categoryCountData" /></echartCard>
        </el-col>
        <el-col :span="8">
          <echartCard>
            <roseEchart :op-data="categorySaleData1" />
          </echartCard>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <echartCard>
            <lineEchart v-bind="categorySaleData2" />
          </echartCard>
        </el-col>
        <el-col :span="12">
          <echartCard> <barEchart v-bind="favorData" /></echartCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAmountStore from '@/store/analysis/dashboard/dashboard'
import countCard from './c-cpns/count-card.vue'
import echartCard from './c-cpns/echart-card.vue'
import { storeToRefs } from 'pinia'
import { lineEchart, pieEchart, roseEchart, barEchart } from '@/components/page-echarts'
import useGoodsStore from '@/store/analysis/dashboard/goodsCategory'
import { computed } from 'vue'

//amont仓库
const amountStore = useAmountStore()
amountStore.getAmountListData() //请求数据
const { amountList } = storeToRefs(amountStore)
//goodsCategory仓库
const goodsStore = useGoodsStore()
goodsStore.fetchGoodsCategory()
goodsStore.fetchGoodsSale()
// goodsStore.fetchGoodsTopSale()
goodsStore.fetchGoodsFavor()
const { goodsCategoryList, goodsSaleList, goodsFavorList } = storeToRefs(goodsStore)
//饼图
const categoryCountData = computed(() => {
  return goodsCategoryList.value
    .map((item) => ({
      name: item.name,
      value: item.goodsCount
    }))
    .slice(0, 7)
})
//玫瑰图
const categorySaleData1 = computed(() => {
  return goodsSaleList.value
    .map((item) => ({
      name: item.name,
      value: item.goodsCount
    }))
    .slice(0, 7)
})
//折现图
const categorySaleData2 = computed(() => {
  const label2 = goodsSaleList.value.map((item) => item.name)
  const value2 = goodsSaleList.value.map((item) => item.goodsCount)
  const label = label2.slice(0, 7)
  const value = value2.slice(0, 7)
  return { label, value }
})
//柱状图
const favorData = computed(() => {
  const label = goodsFavorList.value.map((item) => item.name).slice(0, 7)
  const value = goodsFavorList.value.map((item) => item.goodsFavor).slice(0, 7)
  return { label, value }
})
</script>

<style lang="less" scoped>
.dashboard {
  color: black;
}
</style>
