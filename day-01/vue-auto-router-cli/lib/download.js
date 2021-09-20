const {promisify} = require('util')
const ora = require('ora')
const download = promisify(require('download-git-repo'))

module.exports.clone = async function (repo, desc) {
  const tips = ora({
    text: '获取模板中~',
    spinner: 'balloon',
    color: 'cyan'
  })
  tips.start()
  await download(repo, desc).then(() => {
    tips.succeed()
  })
}