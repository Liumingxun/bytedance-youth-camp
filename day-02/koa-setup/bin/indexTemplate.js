import fs from 'fs'
import ejs from 'ejs'

export function createIndexTemplate(config) {
  const template = fs.readFileSync('./template/index.ejs', 'utf-8')

  const code = ejs.render(template, {
    router: config.middleware.router
  })

  return code
}