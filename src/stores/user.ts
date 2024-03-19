import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<User>()

    // 保存数据的方法
    const saveUser = (u: User) => {
      userInfo.value = u
    }
    // 删除数据的方法
    const disUser = () => {
      userInfo.value = undefined
    }

    return { userInfo, saveUser, disUser }
  },
  {
    // 开启自动数据持久化
    persist: true
  }
)
