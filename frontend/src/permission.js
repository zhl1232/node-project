import router from './router'
import store from './store'
import { isLogin } from './api/user'
const whiteList = ['/login', '/register', '/']

router.beforeEach((to, from, next) => {
  let loginState = store.state.loginState
  
  if (!loginState) {
    isLogin().then(res => {
      if (res && res.code == 200) {
        store.commit('login')
      }
    })
  }

  if (loginState) {
    /* has session*/
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* has no session*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 页面在免登录白名单，直接进入,
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
    }
  }
})
