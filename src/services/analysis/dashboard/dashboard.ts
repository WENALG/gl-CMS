import xyRequest from '@/services'

export function getAmountList() {
  return xyRequest.get({
    url: '/goods/amount/list'
  })
}
export function getGoodsCategory() {
  return xyRequest.get({
    url: '/goods/category/count'
  })
}
export function getGoodsSale() {
  return xyRequest.get({
    url: '/goods/category/sale'
  })
}
export function getSaleTop() {
  return xyRequest.get({
    url: '/goods/sale/top10'
  })
}
export function getGoodsFavor() {
  return xyRequest.get({
    url: '/goods/category/favor'
  })
}
