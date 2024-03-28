import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleID } from '@/services/login/login'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
import { mapMenuToPermission, mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any
  permission: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenu: localCache.getCache('userMenu') ?? [],
    permission: []
  }),

  actions: {
    async loginAccountAction(account: IAccount) {
      //1、账号登录并获取信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token
      //2、存储 token 于客户端
      localCache.setCache(LOGIN_TOKEN, this.token)

      //3、获取登录用户的信息（role）
      const getUserInfo = await getUserInfoById(id)
      this.userInfo = getUserInfo.data
      //4、获取登录用户菜单
      const getUserMenus = await getUserMenusByRoleID(this.userInfo.role.id)
      this.userMenu = getUserMenus.data
      // 按钮鉴权 取出permission
      const userPermission = mapMenuToPermission(this.userMenu)
      this.permission = userPermission

      //5、本地缓存数据
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenu', this.userMenu)
      //6、动态添加路由
      const routes = mapMenusToRoutes(this.userMenu)
      routes.forEach((item) => router.addRoute('main', item))
      //7、获取角色和部门列表信息
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      //7、跳转到 main 页面
      router.push('/main')
    },
    //刷新
    loadLocalCacheAction() {
      //用户刷新页面，也进行动态添加路由
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu
        //获取角色和部门列表信息
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        // 按钮鉴权 取出permission
        const userPermission = mapMenuToPermission(this.userMenu)
        this.permission = userPermission
        //添加动态路由
        const routes = mapMenusToRoutes(this.userMenu)
        routes.forEach((item) => router.addRoute('main', item))
      }
    }
  }
})

export default useLoginStore
