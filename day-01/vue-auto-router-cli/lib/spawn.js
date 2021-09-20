const ora = require('ora')
const {spawn} = require('child_process')

module.exports.spawn = async function (...args) {

  const proc = spawn(...args)
  // proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)

}