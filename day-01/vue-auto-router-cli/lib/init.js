const {promisify} = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = (content) =>
  console.log(chalk.bold.bgCyan.rgb(102, 204, 255)(content)
  )

module.exports = async name => {
  clear()
  const data = await figlet('LM YYDS')
  log(data)

}

