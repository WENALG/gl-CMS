import xyRequest from '..'

export function postDepartmentListData() {
  return xyRequest.post({
    url: '/department/list'
  })
}

export function postRoleListData() {
  return xyRequest.post({
    url: '/role/list'
  })
}
export function postMenuListData() {
  return xyRequest.post({
    url: '/menu/list'
  })
}
