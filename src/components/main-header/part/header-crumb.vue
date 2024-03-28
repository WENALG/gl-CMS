<template>
  <div class="header-crumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { computed } from 'vue'
const route = useRoute()
const userMenu = useLoginStore().userMenu
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenu)
})
</script>

<style lang="less" scoped>
.header-crumb {
  color: blue;
}
</style>
