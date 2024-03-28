<template>
  <div class="menu">
    <div class="title">
      <span class="logo">
        <img src="../../assets/img/logo/logo.svg" />
      </span>
      <span v-show="!isFold" class="name">ZGL-CMS</span>
    </div>
    <el-menu
      text-color="#fff"
      :collapse="isFold"
      background-color="#1f1f1f"
      active-text-color="#ffd04b"
      :default-active="defaultActive"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <!-- el-icon-monitor -->
            <el-icon>
              <component :is="item.icon.split('-icon')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="toMenu(subitem)">{{
                subitem.name
              }}</el-menu-item>
            </template>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import useLoginStore from '@/store/login/login'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

const loginStore = useLoginStore()
const userMenus = loginStore.userMenu
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
//监听菜单的点击
function toMenu(item: any) {
  router.push(item.url)
}
//绑定菜单
const route = useRoute()

const defaultActive = computed(() => {
  //依赖于路径的改变
  const menuId = mapPathToMenu(route.path, userMenus)
  return menuId + ''
})
</script>

<style lang="less" scoped>
.menu {
  color: white;
  .title {
    height: 60px;
    display: flex;
    .name {
      display: flex;
      font-size: 22px;
      font-weight: 800;
      white-space: nowrap;
      margin-top: 18px;
    }
    .logo {
      margin: 5px 5px;
    }
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .el-menu {
    border-right: none;
    user-select: none;
    .el-sub-menu {
      .el-menu-item {
        padding-left: 50px;
        background-color: #242424;
      }
      .el-menu-item:hover {
        background-color: darkcyan;
      }
      .el-menu-item.is-active {
        background-color: darkcyan;
      }
    }
  }
}
</style>
