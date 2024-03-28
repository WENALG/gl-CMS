<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <!-- 组件国际化 -->
  <el-config-provider :locale="zhCn">
    <div class="app">
      <RouterView></RouterView>
    </div>
  </el-config-provider>
</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
}
</style>
