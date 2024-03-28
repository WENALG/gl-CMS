import xyRequest from '@/services'
//用户数据请求
export function postUserListData(queryInfo: any) {
  return xyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteOneUser(id: number) {
  return xyRequest.delete({
    url: `/users/${id}`
  })
}

export function addOneUser(userInfo: any) {
  return xyRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function patchEditUser(id: number, userInfo: any) {
  return xyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
//页面数据请求
export function postPageListData(pageName: string, queryInfo: any) {
  return xyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
export function deletePageUser(pageName: string, id: number) {
  return xyRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export function postPageAdd(pageName: string, queryInfo: any) {
  return xyRequest.post({
    url: `/${pageName}`,
    data: queryInfo
  })
}
export function patchPageEdit(pageName: string, id: number, queryInfo: any) {
  return xyRequest.patch({
    url: `/${pageName}/${id}`,
    data: queryInfo
  })
}
