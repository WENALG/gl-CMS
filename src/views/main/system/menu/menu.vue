<template>
  <div class="menu">
    <pageContent :content-config="contentConfg"> </pageContent>
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'

import contentConfg from './config/content.config'
</script>

<style lang="less" scoped></style>
