import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/Home/index.vue') },
        { path: '/article', component: () => import('@/views/Acticle/index.vue') },
        { path: '/notify', component: () => import('@/views/Notify/index.vue') },
        { path: '/user', component: () => import('@/views/User/index.vue') }
      ]
    },

    { path: '/login', component: () => import('@/views/Login/index.vue') }
  ]
})

// 关闭旋转样式
NProgress.configure({
  showSpinner: false
})
// 导航前置守卫，开启进度条
router.beforeEach(() => {
  // 注意开启后，不会自动关闭
  NProgress.start()
})

// 导航后置守卫，关闭进度条
router.afterEach(() => {
  NProgress.done()
})

export default router
