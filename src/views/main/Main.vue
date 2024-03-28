<template>
  <div class="Main">
    <el-container class="room">
      <el-aside :width="isFold ? '60px' : '230px'">
        <mainMenu :is-Fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <mainHeader @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'
const isFold = ref(false)
function handleFoldChange(change: boolean) {
  isFold.value = change
}
</script>

<style lang="less" scoped>
.Main {
  height: 100%;
  .room {
    height: 100%;
  }
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #181818;
    transition: width 0.5s ease;
  }
  .el-header {
    background-color: #fff;
  }
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
