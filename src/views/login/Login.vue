<template>
  <div class="Login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import loginPanel from './c-cpns/login-panel.vue'
</script>

<style lang="less" scoped>
.Login {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  background: url('../../assets/img/祥瑞龙吟.svg');
}
</style>
