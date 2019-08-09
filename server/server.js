/*
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-07-25 23:23:15
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 17:33:08
 * @Description: file content
 * @Versions: 1.0.0
 */
const koa = require('koa')
const path = require('path')
const Router = require('koa-router')
const fs = require('fs')

const user = require('./utils/api/user')
const article = require('./utils/api/article')
const keys = require('./utils/keys')

const betterBody = require('koa-better-body')
const convert = require('koa-convert')
const static = require('koa-static-cache')
const session = require('koa-session')

let server = new koa()

// 临时生成 keys 文件。。
// let arr = []
// for (let index = 0; index < 1000; index++) {
//   arr.push(JSON.stringify(randomWord(false, 32)))
// }
// fs.writeFile('./utils/keys.js', `const arr = [${arr}] module.exports = arr`, function(err) {})

server.keys = keys

server.listen(8081, () => {
  console.log('demo is start at 8081')
})

// 上传文件
server.use(
  convert(
    betterBody({
      //指定上传的目录
      uploadDir: path.resolve(__dirname, './static/upload'),
      //是否保留扩展名
      keepExtensions: true,
      //设置上传文件大小最大限制，默认2M
      maxFileSize: 1024 * 1024 * 1024
    })
  )
)

//使用中间件，并配置静态资源目录
server.use(
  static(path.join(__dirname, './static'), {
    //是否压缩文件
    gzip: true,
    //缓存有效时间
    maxAge: 60
  })
)


// session 配置
const SESSION_CONFIG = {
  key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 7200000, // 过期时间，两小时
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: true /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
server.use( session( SESSION_CONFIG, server ) )


// seesion 中间件
let router = new Router()
router.all('*', async (ctx, next) => {
  //获取用户请求的URL
  let url = ctx.request.url
  let whiteList = ['/login', '/article', '/get-verify-code', '/register']
  //login路径为不需要登陆态，因为它是登陆方法，执行next则跳到controller中
  if (whiteList.includes(url)) return await next()
  //假设登陆态是设置了user属性
  let user = ctx.session.username
  //没有登陆态
  if (!user) {
    ctx.body = {
      success: false,
      msg: '未登录或者登录超时，请重新登录',
      err: 10000,
      data: {
        code: 401
      }
    }
    return
  }
  //正常执行controller
  await next()
})
server.use(router.routes())
server.use(user.routes())
server.use(article.routes())
