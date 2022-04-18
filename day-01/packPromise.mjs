import { readFile } from "fs";

function p_readFile(path, options) {
  return new Promise((resolve, reject) => {
    readFile(path, options,(err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}

p_readFile('./buffer.js', 'utf-8').then(data => {
  console.log(data)
}).catch(err => {
  console.log(err.message)
})
