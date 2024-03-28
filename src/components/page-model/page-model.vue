<template>
  <div class="user-model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNew ? pros.modelConfig.header.newTitle : pros.modelConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form label-width="auto" :model="formData">
          <template v-for="item in pros.modelConfig.formDataC" :key="item.prop">
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input
                  v-model="formData[item.prop]"
                  size="large"
                  :placeholder="item.placeholder"
                />
              </el-form-item>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-form-item :label="item.label" :prop="item.parentId">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  size="large"
                  style="width: 100%"
                >
                  <template v-for="iten in item.options" :key="iten.value">
                    <el-option :label="iten.label" :value="iten.id"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"> </slot>
            </template>
          </template>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmClick"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/store/main/system/system'

//定义配置表单
interface IModel {
  modelConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formDataC: any[]
  }
  webInfo?: any
}
const pros = defineProps<IModel>()
const key: any = {}
for (const item of pros.modelConfig.formDataC) {
  key[item.prop] = ''
}
const formData = reactive<any>(key)
console.log(formData)
//
const isNew = ref(true)
//用户id
let itemId: number = 0
//使用Store
//const mainStore = useMainStore()
const systemStore = useSystemStore()
//获取角色和部门数据
//const { roleList, departmentList } = storeToRefs(mainStore)

//控制窗口
const dialogVisible = ref(false)
function setDialogVisible(item?: any) {
  dialogVisible.value = true
  if (item) {
    //编辑
    itemId = item.id
    isNew.value = false
    for (const key in formData) {
      formData[key] = item[key]
    }
  } else {
    //新建
    isNew.value = true
    for (const key in formData) {
      formData[key] = ''
    }
  }
}
//确定按钮
function confirmClick() {
  let formDataAdd = formData
  if (pros.webInfo) {
    formDataAdd = { ...formDataAdd, ...pros.webInfo }
    console.log(formDataAdd)
  }
  //关闭窗口
  dialogVisible.value = false
  if (isNew.value) {
    //新建
    systemStore.postPageAddAction(pros.modelConfig.pageName, formDataAdd)
  } else {
    //编辑
    systemStore.patchPageEditAction(pros.modelConfig.pageName, itemId, formDataAdd)
  }
}
//暴露方法
defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
.user-model {
  .form {
    margin: 10px 35px;
  }
}
</style>
