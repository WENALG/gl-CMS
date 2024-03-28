<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuChange">
      <el-icon size="30px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <headerCrumb />
      <personInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerCrumb from './part/header-crumb.vue'
import personInfo from '../main-header/part/personal-info.vue'

const emit = defineEmits(['foldChange'])
const isFold = ref(false)

function handleMenuChange() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 15px;
  }
}
</style>
