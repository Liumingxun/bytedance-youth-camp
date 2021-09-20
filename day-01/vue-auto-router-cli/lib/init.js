const {promisify} = require('util')
const open = require('open')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const {clone} = require('./download')
const {spawn} = require('./spawn')
const ora = require('ora')
const log = (content) =>
  console.log(chalk.bold.bgCyan.rgb(102, 204, 255)(content)
  )

module.exports = async name => {
  clear()
  const welcome = figlet.textSync('LM\'s CLI', {
    font: 'lean',
    whitespaceBreak: true
  })
  log(welcome)

  log('🎉创建项目' + name)
  // await clone('direct:https://codeload.github.com/su37josephxia/vue-template/zip/refs/heads/master',name)

  const tips = ora({
    text: '安装依赖中~',
    spinner: 'balloon',
    color: 'cyan'
  })
  tips.start()
  // await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: `./${name}` })
  tips.succeed()
  log('🎉安装完成：\n' +
    'To get Start:\n' +
    '===========================\n' +
    `    cd ${name}\n` +
    '    npm run serve\n' +
    '===========================')

  await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'serve'], { cwd: `./${name}` })
  open('http://localhost:8081')

}

