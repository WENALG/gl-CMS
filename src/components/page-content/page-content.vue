<template>
  <div class="user-content">
    <div class="content">
      <div class="title">
        <span style="margin-top: 6px"
          ><h2>{{ props.contentConfig.header?.title }}</h2></span
        >
        <span class="plus">
          <el-button
            v-if="isCreate"
            type="primary"
            icon="Plus"
            size="large"
            circle
            @click="addUser"
          >
          </el-button>
        </span>
      </div>
      <div class="info">
        <div class="table">
          <el-table
            ref="multipleTableRef"
            :data="pageList"
            style="width: 100%"
            border
            v-bind="contentConfig.childrenTree"
          >
            <template v-for="item in props.contentConfig.tableList" :key="item.prop">
              <template v-if="item.type === 'date'">
                <el-table-column v-bind="item">
                  <template #default="data"> {{ formatUtc(data.row.createAt) }} </template>
                </el-table-column>
              </template>
              <template v-else-if="item.type === 'control'">
                <el-table-column v-bind="item">
                  <template #default="data">
                    <el-button
                      v-if="isUpdate"
                      text
                      size="small"
                      type="primary"
                      icon="Edit"
                      @click="editClick(data.row)"
                      >编辑</el-button
                    >
                    <el-button
                      v-if="isDelete"
                      text
                      size="small"
                      type="danger"
                      icon="Delete"
                      @click="deleteClick(data.row.id)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </template>
              <template v-else-if="item.type === 'customied'">
                <el-table-column v-bind="item">
                  <template #default="scoped">
                    <slot :name="item.slotName" v-bind="scoped" :who="item.prop" age="哈哈"></slot>
                  </template>
                </el-table-column>
              </template>
              <template v-else>
                <el-table-column v-bind="item" />
              </template>
            </template>
          </el-table>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUtc } from '@/utils/dayjs'
import { ref } from 'vue'
import isPermission from '@/hooks/usePermision'

//定义配置表单
interface IContent {
  contentConfig: {
    pageName: string
    header?: {
      title: string
    }
    tableList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IContent>()
//

const isCreate = isPermission(`${props.contentConfig.pageName}:create`)
const isUpdate = isPermission(`${props.contentConfig.pageName}:update`)
const isDelete = isPermission(`${props.contentConfig.pageName}:delete`)
const isQuery = isPermission(`${props.contentConfig.pageName}:query`)
//请求用户列表数据和存储
const systemStore = useSystemStore()
//定义事件
const emits = defineEmits(['addnewUser', 'editUser'])
//获取用户数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)
//添加用户
function addUser() {
  emits('addnewUser')
}
//页码相关
const pageSize4 = ref(10)
const currentPage4 = ref(1)

//请求数据函数
fetchPageListData()

function handleCurrentChange() {
  fetchPageListData()
}
function handleSizeChange() {
  fetchPageListData()
}
//编辑按钮
function editClick(itemData: any) {
  emits('editUser', itemData)
}
//删除按钮
function deleteClick(id: number) {
  systemStore.deletePageUserById(props.contentConfig.pageName, id)
}
//请求数据函数
function fetchPageListData(data: any = {}) {
  // if(!isQuery) return
  //页面参数
  const size = pageSize4.value
  const offset = (currentPage4.value - 1) * size
  const pageInfo = { size, offset }
  //加上请求数据参数
  const allInfo = { ...pageInfo, ...data }
  //请求数据
  systemStore.postPageListAction(props.contentConfig.pageName, allInfo)
}
//暴露函数，给其他组件来调用它
defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.user-content {
  .content {
    border-radius: 8px;
    margin-top: 20px;
    background-color: #fff;

    .title {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      .plus {
        padding-right: 20px;
      }
    }
    .table {
      padding: 0px 15px;
      :deep(.el-table__cell) {
        padding: 12px;
      }
    }
    .pagination {
      padding: 25px 0px 30px 0px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
