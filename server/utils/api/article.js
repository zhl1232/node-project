/*
 * @File:
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-08-07 15:42:03
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 18:17:55
 * @Description: file content
 * @Versions: 1.0.0
 */
const Router = require('koa-router')
const db = require('../database')
const { parseTime, isEmptyObject } = require('../tool')
const fs = require('fs')

let article = new Router()
let upload = new Router()

article.post('/article', async ctx => {
  let username = ctx.session.username
  const { title, content, type } = ctx.request.fields
  let thumb = ctx.request.fields.thumb || 'upload/default-thumb.jpg'
  let time = parseTime(new Date())
  console.log(time)

  let author = username

  let data = await db.query(
    'INSERT INTO article_table (title,content,type,thumb,time,author) VALUES(?,?,?,?,?,?)',
    [title, content, type, thumb, time, author]
  )

  console.log(data)

  ctx.body = {
    success: true,
    msg: '',
    data: {
      ...data[0]
    }
  }
})

article.get('/article', async ctx => {
  let data

  let query = ctx.request.query
  if (isEmptyObject(query)) {
    data = await db.query(`SELECT * FROM article_table WHERE 1`)
  } else if (query.search) {
    if ( query.desc ) {
      console.log(query.search)
      
      data = await db.query(`SELECT * FROM article_table ORDER BY ${query.search} DESC`)
    } else {
      data = await db.query(`SELECT * FROM article_table ORDER BY ${query.search}`)
    }
  } else {
    for (const key in query) {
      data = await db.query(`select * from article_table where ${key} = '${query[key]}'`)
    }
  }

  ctx.body = {
    success: true,
    msg: '',
    data: {
      data
    }
  }
})

upload.post('/upload', async ctx => {
  let { path } = ctx.request.files[0]

  // let username = ctx.session.username
  path = path.slice(path.indexOf('upload')).replace(/\\/g, '/')

  ctx.body = {
    success: true,
    msg: '上传成功',
    data: {
      url: path
    }
  }
})
article.use(upload.routes())

module.exports = article
