import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'
function usePageContent() {
  //组件实例对象
  const contentRef = ref<InstanceType<typeof pageContent>>()
  //搜索
  function handleQuerySearch(searchDate: any) {
    contentRef.value?.fetchPageListData(searchDate)
  }
  //重置
  function handleResetForm() {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleQuerySearch,
    handleResetForm
  }
}
export default usePageContent
