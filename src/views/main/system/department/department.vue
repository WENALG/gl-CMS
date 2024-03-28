<template>
  <div class="department">
    <pageSearch
      @query-search="handleQuerySearch"
      @reset-form="handleResetForm"
      :search-config="searchConfig"
    />
    <pageContent
      ref="contentRef"
      @edit-user="handleEditUser"
      @addnew-user="handleAddUser"
      :content-config="contentConfig"
    >
      <template #leader="scoped">
        <span class="leader"> {{ scoped.row[scoped.who] }}+{{ scoped.age }} </span>
      </template>
    </pageContent>
    <pageModel ref="modelRef" :model-config="modelConfigRef" />
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

import { computed } from 'vue'
import usemainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

//对 modelConfig 动态添加数据 操作
const modelConfigRef = computed(() => {
  const mainStore = usemainStore()
  const departments = mainStore.departmentList.map((item) => {
    return { label: item.name, id: item.id }
  })
  modelConfig.formDataC.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modelConfig
})
//搜索与重置
const { contentRef, handleResetForm, handleQuerySearch } = usePageContent()
//新建与编辑
const { modelRef, handleAddUser, handleEditUser } = usePageModel()
</script>

<style lang="less" scoped>
.department {
  .leader {
    color: red;
  }
}
</style>
