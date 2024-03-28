import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 创建空数组用来存放动态路由
  const localRoutes: RouteRecordRaw[] = []
  //动态获取router/main下的所有路由文件里的内容 import.meta.glob
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
//登录时 展示第一个菜单 用来绑定
export let firstMenu: any = null

//菜单到路由的映射
export function mapMenusToRoutes(userMenu: any) {
  //获取本地路由
  const localRoutes = loadLocalRoutes()
  //把用户菜单和本地路由作比较，若一致则添加 router.addRoute
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        //保存一次顶级菜单的路由，并设置第一个菜单为重定向
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route })
        }
        routes.push(route)
      }
      if (!firstMenu && route) {
        firstMenu = route
      }
    }
  }
  return routes
}
//路经到菜单的映射
export function mapPathToMenu(path: string, userMenu: any[]) {
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        return submenu.id
      }
    }
  }
  return undefined
}
// 路径到面包屑
export function mapPathToBreadcrumbs(path: string, userMenu: any[]) {
  const breadcrumbs: any[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
// 菜单里的 所有id 到 一个数组中
export function mapMenuListToIds(menuList: any) {
  const ids: number[] = []
  function recurseGetId(menuList: any) {
    for (const item of menuList) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
    return ids
  }
  recurseGetId(menuList)
  return ids
}
//按钮鉴权 从menus取出 permission
export function mapMenuToPermission(menuList: any) {
  const permissions: string[] = []
  function recurseGetPermission(data: any) {
    for (const item of data) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  return permissions
}
