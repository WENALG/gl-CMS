import {
  addOneUser,
  deleteOneUser,
  deletePageUser,
  patchEditUser,
  patchPageEdit,
  postPageAdd,
  postPageListData,
  postUserListData
} from '@/services/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,
    //通用页面
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    //用户数据请求
    async postUserListAction(queryInfo: any) {
      const userListData = await postUserListData(queryInfo)
      const { list, totalCount } = userListData.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserById(id: number) {
      const deleteResult = await deleteOneUser(id)
      //重新发送用户列表
      this.postUserListAction({ size: 10, offset: 0 })
    },
    async postAddUserAction(userInfo: any) {
      const adduserResult = await addOneUser(userInfo)
      //重新发送用户列表
      this.postUserListAction({ size: 10, offset: 0 })
    },
    async patchEditUserAction(id: number, userInfo: any) {
      const editResult = await patchEditUser(id, userInfo)
      //重新发送用户列表
      this.postUserListAction({ size: 10, offset: 0 })
    },
    //通用页面数据请求
    async postPageListAction(pageName: string, queryInfo: any) {
      const postResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = postResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageUserById(pageName: string, id: number) {
      const deleteResult = await deletePageUser(pageName, id)
      //重新发送用户列表
      this.postPageListAction(pageName, { size: 10, offset: 0 })
    },
    async postPageAddAction(pageName: string, queryInfo: any) {
      const postResult = await postPageAdd(pageName, queryInfo)
      console.log(postResult)
      //重新发送用户列表
      this.postPageListAction(pageName, { size: 10, offset: 0 })
    },
    async patchPageEditAction(pageName: string, id: number, queryInfo: any) {
      const patchResult = await patchPageEdit(pageName, id, queryInfo)
      console.log(patchResult)
      //重新发送用户列表
      this.postPageListAction(pageName, { size: 10, offset: 0 })
    }
  }
})
export default useSystemStore
