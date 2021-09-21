import fs from 'fs'
import path from "path";
import {fileURLToPath} from "url";
import ejs from 'ejs'
import prettier from "prettier";



export function createPackageJsonTemplate(config) {
  const __dirname = fileURLToPath(import.meta.url);
  const template = fs.readFileSync(path.resolve(__dirname, '../../template/package.ejs'), 'utf-8')

  const code = ejs.render(template, {
    packageName: config.packageName,
    router: config.middleware.router,
    static: config.middleware.static
  })

  return prettier.format(code, {
    parser: 'json'
  })
}