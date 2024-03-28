<template>
  <div class="login-panel">
    <h1 class="title">Vue3+TS 后台管理系统</h1>
    <div class="tabs">
      <el-tabs stretch v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="account-label">
              <el-icon><UserFilled /></el-icon>
              <span>账号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="phone">
          <template #label>
            <div class="phone-label">
              <el-icon><Iphone /></el-icon>
              <span>手机号登录</span>
            </div>
          </template>
          <panelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRememberWord" label="记住密码" size="large" />
      <el-link>忘记密码</el-link>
    </div>
    <el-button type="primary" size="large" class="login-btn" @click="handleLoginBtn"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import panelAccount from '../c-cpns/panel-account.vue'
import panelPhone from '../c-cpns/panel-phone.vue'

const isRememberWord = ref<boolean>(false)
const activeName = ref('account')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const accountRef = ref<InstanceType<typeof panelAccount>>()

function handleLoginBtn() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRememberWord.value)
  } else {
    console.log('手机号登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  background-color: white;
  height: 358px;
  width: 360px;
  .title {
    margin: 15px 20px;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    margin: 5px 15px;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
    --el-button-size: 45px;
  }
  .el-link {
    margin-right: 8px;
  }
}
</style>
