import {
  getGoodsCategory,
  getGoodsFavor,
  getGoodsSale
} from '@/services/analysis/dashboard/dashboard'
import { defineStore } from 'pinia'

interface IGoods {
  goodsCategoryList: any[]
  goodsSaleList: any[]
  goodsTopSaleList: any[]
  goodsFavorList: any[]
}
const useGoodsStore = defineStore('goods', {
  state: (): IGoods => ({
    goodsCategoryList: [],
    goodsSaleList: [],
    goodsTopSaleList: [],
    goodsFavorList: []
  }),
  actions: {
    async fetchGoodsCategory() {
      const fetchResult = await getGoodsCategory()
      this.goodsCategoryList = fetchResult.data
    },
    async fetchGoodsSale() {
      const fetchResult = await getGoodsSale()
      this.goodsSaleList = fetchResult.data
    },
    async fetchGoodsTopSale() {
      const fetchResult = await getGoodsSale()
      this.goodsTopSaleList = fetchResult.data
    },
    async fetchGoodsFavor() {
      const fetchResult = await getGoodsFavor()
      this.goodsFavorList = fetchResult.data
    }
  }
})
export default useGoodsStore
