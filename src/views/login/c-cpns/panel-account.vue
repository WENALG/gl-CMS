<template>
  <el-form
    label-width="65px"
    :model="account"
    :rules="accountRules"
    status-icon
    size="large"
    class="mo"
    ref="formRef"
  >
    <el-form-item label="账号" prop="name" class="modify">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password" class="modify">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import { ElMessage } from 'element-plus'
import type { ElForm, FormRules } from 'element-plus'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_WORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_WORD) ?? ''
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,20}$/, message: '必须是3~20数字或字母组成~', trigger: 'change' }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,}$/, message: '必须是6位以上数字或字母组成~', trigger: 'change' }
  ]
}
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

function loginAction(RememberWord: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      //1、获取用户输入的账号和密码
      const name = account.name
      const password = account.password
      //2、向服务器发送网络请求
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (RememberWord) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_WORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_WORD)
        }
      })
    } else {
      ElMessage.error('Oops, 输入错误！')
    }
  })
}
defineExpose({
  loginAction
})
</script>
<style scoped>
.mo {
  margin-top: 12px;
  margin-bottom: 25px;
}
.modify {
  margin-right: 20px;
}
</style>
