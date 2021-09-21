import fs from 'fs'
import ejs from 'ejs'

export function createPackageJsonTemplate(config) {
  const template = fs.readFileSync('./template/package.ejs', 'utf-8')

  const code = ejs.render(template, {
    packageName: config.packageName
  })

  return code
}