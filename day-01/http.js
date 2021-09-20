const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
  const {url, method, headers} = req
  // console.log(req)
  if (url === '/' && method === 'GET') {
    fs.readFile('index.html', ((err, data) => {
      if (err) {
        res.statusCode = 500
        // Content-Type: text/plain; charset=utf-8
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('服务器出了点小问题')
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.write(data)
      res.end()
    }))
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    // readFile 读取把全部图片加载到内存
    fs.createReadStream('.' + url).pipe(res)
  } else {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('没找到你想要的文件')
  }

})
  .listen(2000, () => {
    console.log('server at 2000')
  })

// 跨域问题  <==  浏览器拦截

// req, res 是流