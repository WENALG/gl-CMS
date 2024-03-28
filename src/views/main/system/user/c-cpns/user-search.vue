<template>
  <div class="user-search">
    <div class="search">
      <el-form :model="searchForm" ref="formRef" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="searchForm.name" size="large" placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" prop="realname">
              <el-input v-model="searchForm.realname" size="large" placeholder="请输入真实姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话号码" prop="cellphone">
              <el-input v-model="searchForm.cellphone" size="large" placeholder="请输入电话号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin-top: -15px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="状态" prop="enable">
                <el-select v-model="searchForm.enable" size="large" placeholder="选择状态">
                  <el-option label="启用" :value="1" />
                  <el-option label="禁用" :value="0" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间" prop="createAt">
                <el-date-picker
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                  v-model="searchForm.createAt"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <!-- 重置和搜索的按钮 -->
      <div class="btn">
        <el-button icon="refresh" size="large" @click="resetClick" style="margin-right: 10px"
          >重置</el-button
        >
        <el-button type="primary" size="large" icon="Search" @click="searchClick">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
//表单数据
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
//拿到ElForm的表单实例，利用里面的resetFields重置
const formRef = ref<InstanceType<typeof ElForm>>()
function resetClick() {
  formRef.value?.resetFields()
  emits('resetForm')
}
//发送事件
const emits = defineEmits(['querySearch', 'resetForm'])
function searchClick() {
  emits('querySearch', searchForm)
}
</script>

<style lang="less" scoped>
.user-search {
  .search {
    background-color: #fff;
    height: 220px;
    border-radius: 8px;

    .el-form-item {
      padding: 30px 50px 0px 20px;
    }
    .btn {
      text-align: right;
      margin: 0px 100px 5px;
    }
  }
}
</style>
