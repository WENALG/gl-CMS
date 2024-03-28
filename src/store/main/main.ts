import { postDepartmentListData, postMenuListData, postRoleListData } from '@/services/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  roleList: any[]
  departmentList: any[]
  menuList: any[]
}
const mainStore = defineStore('main', {
  state: (): IMainState => ({
    roleList: [],
    departmentList: [],
    menuList: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const departmentResult = await postDepartmentListData()
      const roleResult = await postRoleListData()
      const menuResult = await postMenuListData()
      this.roleList = roleResult.data.list
      this.departmentList = departmentResult.data.list
      this.menuList = menuResult.data.list
    }
  }
})
export default mainStore
