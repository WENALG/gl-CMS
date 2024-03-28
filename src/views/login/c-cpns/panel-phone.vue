<template>
  <div class="panel-phone">
    <el-form label-width="65px" :model="phone" size="large">
      <el-form-item label="手机号" prop="phoneID" class="mo">
        <el-input v-model="phone.id" class="modi" />
      </el-form-item>
      <el-form-item label="验证码" prop="password" class="mo">
        <div class="modify">
          <el-input v-model="phone.password" />
          <el-button type="primary" class="btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const phone = reactive({
  id: '',
  password: ''
})
</script>

<style lang="less" scoped>
.panel-phone {
  margin-top: 12px;
  margin-bottom: 25px;
  .modify {
    display: flex;
    .btn {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  .modi {
    margin-right: 20px;
  }
  .mo {
    margin-left: 8px;
  }
}
</style>
