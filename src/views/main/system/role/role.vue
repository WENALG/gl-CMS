<template>
  <div class="role">
    <pageSearch
      :search-config="searchConfig"
      @query-search="handleQuerySearch"
      @reset-form="handleResetForm"
    />
    <pageContent
      ref="contentRef"
      :content-config="contentConfig"
      @addnew-user="handleAddUser"
      @edit-user="handleEditUser"
    />
    <pageModel ref="modelRef" :model-config="modelConfig" :web-info="webInfo">
      <template>
        <el-tree
          ref="elTreeRef"
          :data="menuList"
          show-checkbox
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }"
          @check="boxClick"
        />
      </template>
    </pageModel>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModel from '@/components/page-model/page-model.vue'

import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import modelConfig from './config/model.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'

//仓库中拿数据
const mainStore = useMainStore()
const { menuList } = storeToRefs(mainStore)
//搜索与重置
const { contentRef, handleQuerySearch, handleResetForm } = usePageContent()
//新建与编辑
const { modelRef, handleAddUser, handleEditUser } = usePageModel(editCallBack)

const elTreeRef = ref<InstanceType<typeof ElTree>>()
const webInfo = ref({})
function boxClick(data1: any, data2: any) {
  const menuListId = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  webInfo.value = { menuList: menuListId }
}
//从编辑按钮里 取出 该条的数据
function editCallBack(cbData: any) {
  // menList中递归取出 所有id 放在一个数组里
  const ids: number[] = []
  function recurseGetId(menuList: any) {
    for (const item of menuList) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
    return ids
  }
  recurseGetId(cbData.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(ids)
  })
}
</script>

<style lang="less" scoped></style>
