import type pageModel from '@/components/page-model/page-model.vue'
import { ref } from 'vue'
type EditFcn = (data: any) => void
function usePageModel(editCallBack?: EditFcn) {
  //组件实例
  const modelRef = ref<InstanceType<typeof pageModel>>()
  //添加
  function handleAddUser() {
    modelRef.value?.setDialogVisible()
  }
  //编辑
  function handleEditUser(itemData: any) {
    modelRef.value?.setDialogVisible(itemData)
    if (editCallBack) {
      editCallBack(itemData)
    }
  }
  return {
    modelRef,
    handleAddUser,
    handleEditUser
  }
}
export default usePageModel
