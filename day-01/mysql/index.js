const mysql = require('mysql2/promise')

async function s (){

  const mysql = require('mysql2/promise')

  const cfg = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'xshop'
  }

  const conn = await mysql.createConnection(cfg)

  let ret = await conn.execute(`CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`)

  console.log("Create", ret)

  ret = await conn.execute(`INSERT INTO test(message) VALUES('abc')`)
  console.log("insert", ret)
}
s()