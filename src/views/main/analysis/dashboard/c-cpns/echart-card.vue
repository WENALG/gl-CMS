<template>
  <div class="echar-card">
    <div class="title">卡片内容</div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.echar-card {
  margin-top: 20px;
  background-color: white;
  .title {
    padding-left: 20px;
    display: flex;
    height: 50px;
    align-items: center;
    border-bottom: 1.5px solid #f0f2f5;
  }
  .content {
    margin: 20px;
  }
}
</style>
