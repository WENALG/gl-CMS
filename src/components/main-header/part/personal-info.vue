<template>
  <div class="personal-info">
    <div class="icon">
      <span>
        <span class="dot"></span>
        <el-icon size="21px" class="item"><Message /></el-icon>
      </span>
      <span>
        <el-icon size="21px" class="item"><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon size="21px" class="item"><Search /></el-icon>
      </span>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="35"
            src="https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png"
          />
          <div class="name">zgl</div>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><View /></el-icon>
              <span> 个人信息 </span></el-dropdown-item
            >
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span> 修改密码 </span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleExit">
              <el-icon><SwitchButton /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleExit() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.personal-info {
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    align-items: center;
    justify-content: space-between;
    span {
      position: relative;
    }
    .item {
      width: 36px;
      height: 32px;
      margin-right: 5px;
      &:hover {
        background-color: #f2f2f2;
        cursor: pointer;
      }
    }
    .dot {
      position: absolute;
      z-index: 10;
      right: 3px;
      border-radius: 100%;
      background-color: red;
      height: 6px;
      width: 6px;
    }
  }
  .right {
    .user-info {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .name {
        margin-left: 5px;
      }
      :global(.el-dropdown-menu__item) {
        padding: 10px 20px;
      }
    }
  }
}
</style>
