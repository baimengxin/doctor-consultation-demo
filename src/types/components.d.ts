import CpNavBar from '@/components/CpNavBar.vue'

// 声明 vue 类型模块
declare module 'vue' {
  // 给 vue  添加全局组件类型，interface 和之前的合并
  interface GlobalComponents {
    // 定义具体组件类型，typeof 获取到组件实例类型
    // typeof 作用是得到对应的TS类型
    CpNavBar: typeof CpNavBar
  }
}
