#!/usr/bin/env node
import fs from 'fs'
import path from "path";
import chalk from "chalk";

import {createIndexTemplate} from './indexTemplate.js'
import {createPackageJsonTemplate} from './packageJsonTemplate.js'
import {question} from "./question.js"
import {createConfig} from "./config.js"
import execa from "execa"

const answer = await question();
const config = createConfig(answer);
//  核心：自动化
// 1, 创建文件夹（项目名）
console.log(chalk.bgCyan.rgb(102,204,255)(`创建项目文件夹:${config.packageName}`))
fs.mkdirSync(getRootPath())

// 2, 创建 index.js
fs.writeFileSync(getRootPath() + '/index.js', createIndexTemplate(config))

// 3, 创建 package.json
fs.writeFileSync(getRootPath() + '/package.json', createPackageJsonTemplate(config))

// 4, 安装依赖
console.log(chalk.bgCyan.rgb(102,204,255)('安装依赖……'))
execa('npm', ['install'],{
  cwd: getRootPath(),
  stdio: [2, 2, 2]
})


function getRootPath() {
  return path.resolve(process.cwd(), config.packageName)
}
