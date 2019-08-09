const Router = require('koa-router')
const db = require('../database')
const fs = require('fs')

let user = new Router()
let register = new Router()
let verifyCode = new Router()
let login = new Router()
let uploadProfile = new Router()
let userInfo = new Router()
register.post('/register', async ctx => {
  const { password, affirmPassword, email, name, verifyCode } = ctx.request.fields
  // if (typeof password !== 'string') {
  //   password = password.toString()
  // }
  // if (typeof name !== 'string') {
  //   name = name.toString()
  // }

  if (password !== affirmPassword) {
    ctx.body = {
      success: false,
      msg: '请确认两次输入密码一致'
    }
  } else if (!password || !email || !name || !verifyCode) {
    ctx.body = {
      success: false,
      msg: '输入信息非法，请重新输入'
    }
  } else if (verifyCode.length !== 6) {
    ctx.body = {
      success: false,
      msg: '验证码错误，请重新输入'
    }
  } else if (password.length < 8) {
    ctx.body = {
      success: false,
      msg: '密码不能小于8位'
    }
  } else {
    let data = await db.query(`select * from user_table where username = '${name}'`)

    if (data.length == 0) {
      let data = await db.query('INSERT INTO user_table (username,password,email) VALUES(?,?,?)', [
        name,
        password,
        email
      ])
      if (data.insertId) {
        ctx.body = {
          success: true,
          msg: '注册成功'
        }
      }
    } else {
      ctx.body = {
        success: false,
        msg: '用户名已存在'
      }
    }
  }
})

verifyCode.post('/get-verify-code', async ctx => {
  const { email } = ctx.request.fields

  let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

  if (reg.test(email)) {
    let code = Math.random()
      .toString()
      .slice(-6)
    ctx.body = {
      success: true,
      msg: '验证码已发送',
      data: {
        code
      }
    }
  } else {
    ctx.body = {
      success: false,
      msg: '邮箱格式错误'
    }
  }
})

// 登录
login.post('/login', async ctx => {
  const { name, password } = ctx.request.fields
  let data = await db.query(`select * from user_table where username = '${name}'`)
  console.log(data)

  if (data.length === 0) {
    ctx.body = {
      success: false,
      msg: '没有该用户'
    }
  } else {
    if (password === data[0].password) {
      ctx.body = {
        success: true,
        msg: '登录成功'
      }
      ctx.session.username = name
    } else {
      ctx.body = {
        success: false,
        msg: '密码错误'
      }
    }
  }
})

// 查询是否登录状态
login.get('/login', async ctx => {
  if (ctx.session.username) {
    ctx.body = {
      success: true,
      msg: '已登录',
      data: {
        code: 200
      }
    }
  } else {
    ctx.body = {
      success: false,
      msg: '未登录或者登录超时，请重新登录',
      err: 10000,
      data: {
        code: 401
      }
    }
  }
})

login.put('/login', async ctx => {
  ctx.session.username = null
  ctx.body = {
    success: true,
    msg: '已登出'
  }
})

uploadProfile.post('/upload-profile', async ctx => {
  let { path } = ctx.request.files[0]
  console.log(path)

  let username = ctx.session.username
  path = path.slice(path.indexOf('upload')).replace(/\\/g, '/')
  console.log(path)

  let data = await db.query(
    `UPDATE user_table SET profile='${path}' WHERE username = '${username}'`
  )

  ctx.body = {
    success: true,
    msg: '上传成功',
    data: {
      url: path
    }
  }
})

userInfo.get('/user-info', async ctx => {
  let username = ctx.session.username
  let data = await db.query(`select * from user_table where username = '${username}'`)
  // console.log(data)

  ctx.body = {
    success: true,
    msg: '',
    data: {
      ...data[0]
    }
  }
})

userInfo.put('/user-info', async ctx => {
  let object = ctx.request.fields
  let username = ctx.session.username
  let key, data
  for (key in object) {
    data = await db.query(
      `UPDATE user_table SET ${key}='${object[key]}' WHERE username = '${username}'`
    )
  }
  console.log(data)
  if (data.warningCount == 0) {
    ctx.body = {
      success: true,
      msg: '',
      data: {
        data: object[key]
      }
    }
  }
})

user.use(register.routes())
user.use(verifyCode.routes())
user.use(login.routes())
user.use(uploadProfile.routes())
user.use(userInfo.routes())
module.exports = user
