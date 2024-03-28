<template>
  <div class="countCard">
    <div class="top">
      <span>{{ title }}</span>
      <span>
        <el-tooltip class="box-item" effect="light" :content="tips" placement="top">
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </span>
    </div>
    <div class="content">
      <span ref="countRef1">
        {{ number1 }}
      </span>
    </div>
    <div class="footer">
      <span style="padding-right: 8px">{{ subtitle }}</span>
      <span ref="countRef2">{{ number2 }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'

interface IPros {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
const props = withDefaults(defineProps<IPros>(), {
  amount: '',
  title: '商品总销量',
  tips: '所有商品的总销量',
  number1: 0,
  number2: 0,
  subtitle: '商品总销量'
})
const countRef1 = ref<HTMLElement>()
const countRef2 = ref<HTMLElement>()
const options = {
  prefix: props.amount === 'saleroom' ? '¥' : '',
  duration: 2
}
onMounted(() => {
  const countUp1 = new CountUp(countRef1.value!, props.number1, options)
  const countUp2 = new CountUp(countRef2.value!, props.number2, options)
  countUp1.start()
  countUp2.start()
})
</script>

<style lang="less" scoped>
.countCard {
  background-color: #fff;
  padding: 20px;
  .top {
    color: gray;
    display: flex;
    justify-content: space-between;
    height: 25px;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    height: 45px;
    font-size: 24px;
    border-bottom: 1.5px solid #f0f2f5;
  }
  .footer {
    display: flex;
    align-items: center;
    padding-top: 10px;
    height: 20px;
    font-size: 15px;
  }
}
</style>
