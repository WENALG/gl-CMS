import useLoginStore from '@/store/login/login'

function isPermission(right: string) {
  const loginStore = useLoginStore()
  const { permission } = loginStore
  return !!permission.find((item: any) => item.includes(right))
}
export default isPermission
