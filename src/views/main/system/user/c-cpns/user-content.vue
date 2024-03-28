<template>
  <div class="user-content">
    <div class="content">
      <div class="title">
        <span style="margin-top: 6px"><h2>用户列表</h2></span>

        <span class="plus">
          <el-button type="primary" icon="Plus" size="large" circle @click="addUser"> </el-button>
        </span>
      </div>
      <div class="info">
        <div class="table">
          <el-table ref="multipleTableRef" :data="userList" style="width: 100%" border>
            <el-table-column type="selection" align="center" width="55" />
            <el-table-column property="name" label="用户名" align="center" width="180" />
            <el-table-column property="realname" label="真实姓名" align="center" width="160" />
            <el-table-column property="cellphone" label="手机号码" align="center" width="180" />
            <el-table-column property="enable" label="状态" align="center" width="106">
              <!-- 自定义插槽 -->
              <template #default="data">
                <el-button size="small" :type="data.row.enable ? 'success' : 'danger'" plain>
                  {{ data.row.enable ? '启用' : '禁用' }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column property="createAt" align="center" label="创建时间" width="250">
              <template #default="data"> {{ formatUtc(data.row.createAt) }} </template>
            </el-table-column>
            <el-table-column property="updateAt" align="center" label="更新时间" width="250">
              <template #default="data"> {{ formatUtc(data.row.updateAt) }} </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230">
              <template #default="data">
                <el-button text size="small" type="primary" icon="Edit" @click="editClick(data.row)"
                  >编辑</el-button
                >
                <el-button
                  text
                  size="small"
                  type="danger"
                  icon="Delete"
                  @click="deleteClick(data.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userTotalCount"
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

//请求用户列表数据和存储
const systemStore = useSystemStore()
//定义事件
const emits = defineEmits(['addnewUser', 'editUser'])
//获取用户数据
const { userList, userTotalCount } = storeToRefs(systemStore)
//添加用户
function addUser() {
  emits('addnewUser')
}
//页码相关
const pageSize4 = ref(10)
const currentPage4 = ref(1)

//请求数据函数
fetchUserListData()

function handleCurrentChange() {
  fetchUserListData()
}
function handleSizeChange() {
  fetchUserListData()
}
//编辑按钮
function editClick(itemData: any) {
  emits('editUser', itemData)
}
//删除按钮
function deleteClick(id: number) {
  console.log(id)
  systemStore.deleteUserById(id)
}
//请求数据函数
function fetchUserListData(data: any = {}) {
  //得到请求参数
  const size = pageSize4.value
  const offset = (currentPage4.value - 1) * size
  const pageInfo = { size, offset }
  const allInfo = { ...pageInfo, ...data }
  //请求数据
  systemStore.postUserListAction(allInfo)
}
//暴露函数，给其他组件来调用它
defineExpose({ fetchUserListData })
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
