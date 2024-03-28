import { getAmountList } from '@/services/analysis/dashboard/dashboard'
import { defineStore } from 'pinia'
interface IAmount {
  amountList: any[]
}
const useAmountStore = defineStore('amount', {
  state: (): IAmount => ({
    amountList: []
  }),
  actions: {
    async getAmountListData() {
      const amountResult = await getAmountList()
      this.amountList = amountResult.data
    }
  }
})
export default useAmountStore
