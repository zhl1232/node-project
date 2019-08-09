/*
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-07-27 18:33:13
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 15:24:14
 * @Description: file content
 * @Versions: 1.0.0
 */
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { logOut } from '@/api/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: false,
    // loginTime: ""
  },
  mutations: {
    login() {
      this.state.loginState = true
      // this.state.loginTime = new Date().getTime()
    }
  },
  actions: {
    LogOut() {
      logOut()
        .then(res => {
          this.state.loginState = false
          router.push("/login")
        })
        .catch(res => {})
    }
  }
})
