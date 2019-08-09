const path = require('path')
module.exports = {
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PORT: '3306',
  DB_PASS: '168168',
  DB_NAME: 'cpts',

  HTTP_PORT: '8081',
  HTTP_ROOT: path.resolve(__dirname, '../static/'),
  HTTP_UPLOAD: path.resolve(__dirname, '../static/upload')
}
