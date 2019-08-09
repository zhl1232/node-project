/*
 * @File:
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-08-08 17:40:13
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 18:08:39
 * @Description: file content
 * @Versions: 1.0.0
 */
import request from '@/utils/request'

let api = process.env.NODE_ENV === 'production' ? '' : '/api'

export function publishContent(data) {
  return request({
    url: `${api}/article`,
    method: 'POST',
    data
  })
}

export function getContent(data) {
  console.log(data)

  return request({
    url: `${api}/article`,
    method: 'GET',
    params: data
  })
}

export function getNewContent() {
  return request({
    url: `${api}/article`,
    method: 'GET',
    params: {
      search: 'time',
      desc: true
    }
  })
}
