import fs from 'fs'
import ejs from 'ejs'
import path from "path";
import {fileURLToPath} from "url";
import prettier from 'prettier'

export function createIndexTemplate(config) {
  const __dirname = fileURLToPath(import.meta.url);
  const template = fs.readFileSync(path.resolve(__dirname, '../../template/index.ejs'), 'utf-8')

  const code = ejs.render(template, {
    router: config.middleware.router,
    static: config.middleware.static,
    port: config.port
  })

  return prettier.format(code, {
    parser: 'babel'
  })
}