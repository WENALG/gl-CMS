<template>
  <div class="user">
    <userSearch @query-search="handleQuerySearch" @reset-form="handleResetForm" />
    <userContent ref="contentRef" @addnew-user="handleAddUser" @edit-user="handleEditUser" />
    <userModel ref="modelRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from '../user/c-cpns/user-search.vue'
import userContent from '../user/c-cpns/user-content.vue'
import { ref } from 'vue'
import userModel from './c-cpns/user-model.vue'

const contentRef = ref<InstanceType<typeof userContent>>()
const modelRef = ref<InstanceType<typeof userModel>>()
function handleQuerySearch(data: any) {
  contentRef.value?.fetchUserListData(data)
}
function handleResetForm() {
  contentRef.value?.fetchUserListData()
}
function handleAddUser() {
  modelRef.value?.setDialogVisible()
}
function handleEditUser(item: any) {
  modelRef.value?.setDialogVisible(item)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 50px;
}
</style>
