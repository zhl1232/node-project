const process = require('process')

// let mode = process.env.OS == 'Windows_NT' ? 'dev' : 'prod'
console.log(process.argv);

let mode = process.argv.includes('--dev') ? 'dev' : 'prod'

// console.log(process.argv.includes('--dev'));

process.env.test = 'test'

module.exports = {
  mode,
  ...(mode == 'dev' ? require('./config.dev') : require('./config.prod'))
}