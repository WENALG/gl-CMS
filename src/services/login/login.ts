import xyRequest from '..'
import type { IAccount } from '@/types/index'

export function accountLoginRequest(account: IAccount) {
  return xyRequest.post({
    url: '/login',
    data: account
  })
}
export function getUserInfoById(id: number) {
  return xyRequest.get({
    url: `/users/${id}`
  })
}
export function getUserMenusByRoleID(id: number) {
  return xyRequest.get({
    url: `/role/${id}/menu`
  })
}
