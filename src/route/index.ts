import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/main/LayoutView.vue'),
      children: [
        {
          path: '', // 这里匹配 '/'
          redirect: '/user-management' // 添加重定向
        },
        {
          path: '/user-management',
          component: () => import('@/views/user_center/UserCenterView.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/login/RigisterView.vue')
    },
    {
      path: '/me',
      component: () => import('@/views/me/MeView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.isLogin && to.path !== '/login' && to.path !== '/register') {
    console.log('页面刷新或首次进入, 获取用户信息')
    const p = userStore.currentUserInfo()
    p.then(() => {
      console.log('获取用户信息成功, 正常跳转')
      next()
    })
    p.catch(() => {
      console.log('获取用户信息失败, 跳转登录页')
      next('/login')
    })
  } else {
    console.log('正常跳转, 无需发起请求')
    next()
  }
})
export default router
