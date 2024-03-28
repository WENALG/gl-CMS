<template>
  <div class="user-model">
    <el-dialog v-model="dialogVisible" :title="isShow ? '新建用户' : '修改用户'" width="30%" center>
      <div class="form">
        <el-form label-width="auto" :model="formData">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" size="large" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" size="large" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isShow" label="密码" prop="password">
            <el-input
              v-model="formData.password"
              type="password"
              size="large"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" size="large" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              size="large"
              style="width: 100%"
            >
              <template v-for="item in roleList" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId"
            ><el-select
              v-model="formData.departmentId"
              placeholder="请选择角色"
              size="large"
              style="width: 100%"
            >
              <template v-for="item in departmentList" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template> </el-select
          ></el-form-item>
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
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'

//定义表单数据
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
//表单密码是否展示
const isShow = ref(true)
//用户id
let itemId: number = 0
//使用Store
const mainStore = useMainStore()
const systemStore = useSystemStore()
//获取角色和部门数据
const { roleList, departmentList } = storeToRefs(mainStore)

//控制窗口
const dialogVisible = ref(false)
function setDialogVisible(item?: any) {
  dialogVisible.value = true
  if (item) {
    //编辑用户
    itemId = item.id
    isShow.value = false
    for (const key in formData) {
      formData[key] = item[key]
    }
  } else {
    //新建用户
    isShow.value = true
    for (const key in formData) {
      formData[key] = ''
    }
  }
}
//确定按钮
function confirmClick() {
  //关闭窗口
  dialogVisible.value = false
  //添加用户请求
  if (isShow.value) {
    systemStore.postAddUserAction(formData)
  } else {
    systemStore.patchEditUserAction(itemId, formData)
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
