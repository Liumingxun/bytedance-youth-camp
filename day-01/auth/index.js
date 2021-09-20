const http = require('http')

const session = {}

http.createServer((req, res) => {
  res.end()
}).listen('2333')