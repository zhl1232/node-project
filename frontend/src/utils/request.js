import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  // baseURL: 'http://localhost:8081/', // 使用代理的时候需要注释掉
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    // console.log('请求拦截器')
    return config
  },
  error => {
    // Do something with request error
    console.log(error, 'error debug') // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  res => {
    // console.log(res)
    if (res.data.err == 10000) {
      // 鉴权，未登录或者登录超时
      let loginState = store.state.loginState
      if (loginState) {
        // 如果是登录状态，退出
        Message({
          message: res.data.msg,
          type: 'error'
        }) 
        store.dispatch('LogOut').then(res => {       
          // location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    } else {
      if (res.data.success) {
        // 成功返回resolve数据
        return Promise.resolve(res.data.data)
      } else {
        // 失败success为flase 返回reject数据
        Message({
          message: res.data.msg,
          type: 'error'
        })
        return Promise.reject(res.data)
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
