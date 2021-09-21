const Koa = require("koa");
const fs = require('fs')
const app = new Koa();

app.use((ctx) => {
  const url = ctx.request.url
  console.log(url)
  if (url === '/') {
    ctx.body = fs.readFileSync('./index.html', 'utf-8')
  } else if (url.endsWith('.js')) {
    // const p = path.resolve(__dirname, url.slice(1))
    // ctx.type = 'text/javascript'
    // ctx.body = fs.readFileSync(p,'utf-8')
    ctx.type = 'text/javascript'
    const source = fs.readFileSync('.' + url, 'utf-8')
    ctx.body = rewriteImport(source)
  } else if (url.startsWith('/@modules')) {
    const moduleName = url.replace('/@modules', '')
    ctx.type = 'text/javascript'
    const prefix = './node_modules' + moduleName
    // const source = fs.readFileSync('./node_modules' + moduleName + '/package.json', 'utf-8')
    const module = require(prefix + '/package.json').module
    const source = fs.readFileSync(prefix + '/' + module, 'utf-8')
    ctx.body = rewriteImport(source)
  }
})

function rewriteImport(source) {
  return source.replace(/(from\s+['"])(?![\.\/])/g, "$1/@modules/")
    .replace(/process\.env\.NODE_ENV/g, '"development"')
}

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
