<template>
  <div class="user-search">
    <div class="search">
      <el-form :model="searchForm" ref="formRef" label-width="100px">
        <el-row :gutter="25">
          <template v-for="item in props.searchConfig.formItems" :key="item.prop">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <template v-if="item.type === 'input'">
                  <el-input
                    v-model="searchForm[item.prop]"
                    :placeholder="item.placeholder"
                    size="large"
                  />
                </template>
                <template v-if="item.type === 'date-picker'">
                  <el-date-picker
                    type="daterange"
                    range-separator="到"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    size="large"
                    v-model="searchForm[item.prop]"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
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
import isPermission from '@/hooks/usePermision'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
//定义动态表单数据
interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const formKey: any = {}
for (const item of props.searchConfig.formItems) {
  formKey[item.prop] = ''
}
const searchForm = reactive(formKey)
//
// const isQuery = isPermission(`${props.searchConfig.pageName}:query`)
//拿到ElForm的表单实例，利用里面的resetFields重置
const formRef = ref<InstanceType<typeof ElForm>>()

//定义发送事件
const emits = defineEmits(['querySearch', 'resetForm'])

function resetClick() {
  formRef.value?.resetFields()
  emits('resetForm')
}
function searchClick() {
  emits('querySearch', searchForm)
}
</script>

<style lang="less" scoped>
.user-search {
  .search {
    background-color: #fff;

    border-radius: 8px;

    .el-form-item {
      padding: 30px 50px 0px 20px;
    }
    .btn {
      text-align: right;
      padding: 20px 50px 25px 0;
    }
  }
}
</style>
