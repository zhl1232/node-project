/*
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-07-27 18:41:32
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 17:37:01
 * @Description: file content
 * @Versions: 1.0.0
 */
import request from '@/utils/request'

let api = process.env.NODE_ENV === 'production' ? '' : '/api'

export async function register(data) {
  return request({
    url: `${api}/register`,
    method: 'POST',
    data
  })
}

export function getVerifyCode(data) {
  return request({
    url: `${api}/get-verify-code`,
    method: 'POST',
    data: {
      email: data
    }
  })
}

export function login(data) {
  return request({
    url: `${api}/login`,
    method: 'POST',
    data
  })
}

export function isLogin() {
  return request({
    url: `${api}/login`,
    method: 'GET'
  })
}

export function logOut() {
  return request({
    url: `${api}/login`,
    method: 'PUT'
  })
}

export function getUserInfo() {
  return request({
    url: `${api}/user-info`,
    method: 'GET'
  })
}

export function modifUserInfo(data) {
  return request({
    url: `${api}/user-info`,
    method: 'PUT',
    data
  })
}
