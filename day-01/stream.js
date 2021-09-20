const fs = require('fs')

const rs = fs.createReadStream('./0.png')
const ws = fs.createWriteStream('./1.png')

rs.pipe(ws)